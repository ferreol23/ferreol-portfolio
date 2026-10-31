"use client";

/*
  HeroVideo — the 60-second Fiverr video (vertical, 9:16) on the right of the hero.
  - Plays muted and on a loop as soon as it's on screen (browsers only allow muted autoplay),
    and pauses while it's scrolled out of view.
  - "Sound on" restarts it from the beginning, with the voice and the music.
  - One sound at a time: "Sound on" pauses the other videos, and starting another video mutes this one.
  - Visitors who asked for reduced motion get the still poster and press play themselves.
  - English captions (public/video/fiverr-promo.en.vtt) can be switched on.
  - The full-screen button opens it big, with the sound on.
  Without JavaScript, the poster (the "from $80" opening frame) is shown.
  The older 30-second presentation lives on in the videos section (reel "presentation").
*/

import { Captions, Maximize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/animations/setup";
import { en } from "@/content/en";
import { withBasePath } from "@/lib/base-path";

const SRC = withBasePath("/video/fiverr-promo.mp4");
const POSTER = withBasePath("/video/fiverr-promo-poster.webp");
const CAPTIONS = withBasePath("/video/fiverr-promo.en.vtt");

const control =
  "grid size-11 place-items-center rounded-full border border-white/15 bg-black/55 text-[#f5f3f0] backdrop-blur-sm transition-colors duration-200 hover:border-accent hover:text-accent";

export function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const trackEl = useRef<HTMLTrackElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [captions, setCaptions] = useState(false);
  // Set when the visitor pauses it: then scrolling back never restarts it on its own.
  const pausedByVisitor = useRef(false);

  // Autoplay (muted) only while the video is on screen, never in reduced-motion mode.
  useEffect(() => {
    const el = video.current;
    if (!el || prefersReducedMotion()) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !pausedByVisitor.current) el.play().catch(() => {});
        else if (!entry.isIntersecting) el.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // One sound at a time: when another video on the page starts, this one goes back to silent.
  // "play" doesn't bubble, so the listener sits on the document in the capture phase.
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const onPlay = (event: Event) => {
      if (event.target !== el && !el.muted) el.muted = true;
    };
    document.addEventListener("play", onPlay, true);
    return () => document.removeEventListener("play", onPlay, true);
  }, []);

  const togglePlay = () => {
    const el = video.current;
    if (!el) return;
    if (el.paused) {
      pausedByVisitor.current = false;
      el.play().catch(() => {});
    } else {
      pausedByVisitor.current = true;
      el.pause();
    }
  };

  const toggleSound = () => {
    const el = video.current;
    if (!el) return;
    if (el.muted) {
      // First listen: start from the top so the voice makes sense.
      el.currentTime = 0;
      el.muted = false;
      pausedByVisitor.current = false;
      // Stop any other video that is playing, so two sounds never overlap.
      document.querySelectorAll("video").forEach((other) => {
        if (other !== el && !other.paused) other.pause();
      });
      el.play().catch(() => {});
    } else {
      el.muted = true;
    }
  };

  // Full screen, with the sound on (iPhone Safari only allows full screen on the video itself).
  const openFullscreen = () => {
    const el = video.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!el) return;
    if (el.muted) toggleSound();
    if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
    else el.webkitEnterFullscreen?.();
  };

  // Captions track: off until the visitor turns it on.
  const toggleCaptions = () => {
    const track = trackEl.current?.track;
    if (!track) return;
    const on = track.mode !== "showing";
    track.mode = on ? "showing" : "hidden";
    setCaptions(on);
  };

  return (
    <>
      <video
        ref={video}
        className="absolute inset-0 size-full object-cover"
        poster={POSTER}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={en.hero.video.label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
      >
        <source src={SRC} type="video/mp4" />
        <track ref={trackEl} src={CAPTIONS} kind="captions" srcLang="en" label="English" />
      </video>

      <div className="absolute bottom-4 left-4 flex gap-2">
        <button type="button" className={control} onClick={togglePlay} aria-label={playing ? en.hero.video.pause : en.hero.video.play}>
          {playing ? <Pause className="size-5" aria-hidden="true" /> : <Play className="size-5" aria-hidden="true" />}
        </button>
        <button type="button" className={control} onClick={toggleSound} aria-pressed={!muted} aria-label={en.hero.video.sound}>
          {muted ? <VolumeX className="size-5" aria-hidden="true" /> : <Volume2 className="size-5" aria-hidden="true" />}
        </button>
        <button
          type="button"
          className={`${control} ${captions ? "border-accent text-accent" : ""}`}
          onClick={toggleCaptions}
          aria-pressed={captions}
          aria-label={en.hero.video.captions}
        >
          <Captions className="size-5" aria-hidden="true" />
        </button>
        <button type="button" className={control} onClick={openFullscreen} aria-label={en.hero.video.fullscreen}>
          <Maximize className="size-5" aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
