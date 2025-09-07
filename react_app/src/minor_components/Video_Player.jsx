import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

import { t } from "../translations";

import "./styles/Video_Player.css";


/**
 * VideoPlayer
 * Props:
 *  - src (string) : URL to .mp4, .webm, .m3u8, etc.
 *  - poster (string) optional
 *  - controls (bool) default true
 *  - muted (bool) default false
 *  - autoPlay (bool) default false
 */
export default function VideoPlayer({
  src,
  poster = "",
  controls = true,
  muted = false,
  autoPlay = false,
  className = "",
}) {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [state, setState] = useState({ loading: true, error: null });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) {
      setState({ loading: false, error: "No source provided" });
      return;
    }

    setState({ loading: true, error: null });

    // Helper: determine if HLS playlist (.m3u8)
    const lower = src.split("?")[0].toLowerCase();
    const isHls = lower.endsWith(".m3u8");

    // always set crossOrigin to allow CORS/CDN playback when required
    // your server must return CORS headers.
    video.crossOrigin = "anonymous";
    video.poster = poster;
    video.controls = controls;
    video.muted = muted;
    video.playsInline = true;
    video.preload = "metadata";

    // Event handlers for debugging & state
    const onLoadedMeta = () => {
      // metadata -> duration known
      // console.debug("video loadedmetadata, duration:", video.duration);
      setState((s) => ({ ...s, loading: false }));
    };
    const onCanPlay = () => {
      // can play now
      // console.debug("canplay");
      setState((s) => ({ ...s, loading: false }));
    };
    const onError = (ev) => {
      const code = video.error?.code;
      const message = video.error ? `MediaError code ${code}` : "Unknown media error";
      console.error("Video element error", message, ev, video.error);
      setState({ loading: false, error: message });
    };
    const onStalled = () => {
      console.warn("video stalled");
    };
    const onProgress = () => {
      // buffer progress; good to inspect if streaming works
      // Log buffered ranges here
    };

    video.addEventListener("loadedmetadata", onLoadedMeta);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("error", onError);
    video.addEventListener("stalled", onStalled);
    video.addEventListener("progress", onProgress);

    // Cleanup previous hls if any
    if (hlsRef.current) {
      try {
        hlsRef.current.destroy();
      } catch (e) {}
      hlsRef.current = null;
    }

    if (isHls) {
      // HLS playlist (.m3u8)
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Safari & some browsers support HLS natively
        video.src = src;
      } else if (Hls.isSupported()) {
        const hls = new Hls({
          // optional tuning for large files / streaming
          maxBufferLength: 30,
          backBufferLength: 30,
          xhrSetup: function (xhr, url) {
            // add headers here if needed, e.g. Authorization
            // xhr.setRequestHeader('Authorization', 'Bearer ...');
          },
        });
        hlsRef.current = hls;
        hls.loadSource(src);
        hls.attachMedia(video);

        // Handle errors
        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error("hls.js error", event, data);
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                // network error: try to reload
                setState({ loading: false, error: "Network error while loading stream" });
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                setState({ loading: false, error: "Media decoding error (HLS)" });
                hls.recoverMediaError();
                break;
              default:
                setState({ loading: false, error: "Fatal HLS error" });
                hls.destroy();
                break;
            }
          }
        });
      } else {
        setState({ loading: false, error: "HLS not supported in this browser" });
      }
    } else {
      // Not HLS, plain mp4/webm/etc. Let the browser stream if server supports range requests.
      video.src = src;
    }

    // Attempt to load metadata (this triggers range request / HEAD)
    // Note: Do not call video.play() automatically (some browsers block autoplay).
    // If autoPlay is requested, try to play (muted autoplay more likely to succeed)
    if (autoPlay) {
      const tryPlay = async () => {
        try {
          await video.play();
        } catch (err) {
          // autoplay blocked; don't treat as fatal
          console.warn("Autoplay blocked:", err);
        }
      };
      tryPlay();
    }

    // cleanup
    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMeta);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", onError);
      video.removeEventListener("stalled", onStalled);
      video.removeEventListener("progress", onProgress);
      if (hlsRef.current) {
        try {
          hlsRef.current.destroy();
        } catch (e) {}
        hlsRef.current = null;
      }
      // stop loading/pause
      try {
        video.pause();
      } catch (e) {}
      // avoid keeping src to prevent continued network activity
      try {
        video.src = "";
      } catch (e) {}
    };
  }, [src, poster, controls, muted, autoPlay]);

  return (
    <div className={`video-player ${className}`} style={{ width: "100%", height: "100%", position: "relative" }}>
      {state.loading && (
        <div className="video-loading" aria-hidden>
          {t("videoPlayer_loading")}
        </div>
      )}
      {state.error && (
        <div className="video-error" role="alert">
          {t("videoPlayer_error")}: {state.error}
        </div>
      )}
      <video
        ref={videoRef}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        poster={poster}
      />
    </div>
  );
}
