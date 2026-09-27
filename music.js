```js
/* =========================
   検索・フィルター
   ========================= */

function filterSongs() {
  const selectedCounts = Array.from(
    document.querySelectorAll('input[name="memberCount"]:checked')
  ).map(item => item.value);

  const selectedTypes = Array.from(
    document.querySelectorAll('input[name="songType"]:checked')
  ).map(item => item.value);

  const selectedUnits = Array.from(
    document.querySelectorAll('input[name="unit"]:checked')
  ).map(item => item.value);

  const searchInput = document.getElementById("songSearch");
  const searchText = searchInput
    ? searchInput.value.toLowerCase().trim()
    : "";

  const songs = document.querySelectorAll(".song");

  songs.forEach(song => {
    const countMatch =
      selectedCounts.length === 0 ||
      selectedCounts.includes(song.dataset.count);

    const typeMatch =
      selectedTypes.length === 0 ||
      selectedTypes.includes(song.dataset.type);

    const unitMatch =
      selectedUnits.length === 0 ||
      selectedUnits.includes(song.dataset.unit);

    const songText = song.textContent.toLowerCase();

    const textMatch =
      searchText === "" ||
      songText.includes(searchText);

    song.style.display =
      countMatch &&
      typeMatch &&
      unitMatch &&
      textMatch
        ? ""
        : "none";
  });

  updateSearchResult();

  const activeSearchConditions =
    document.getElementById("activeSearchConditions");

  if (activeSearchConditions) {
    const conditions = [];

    if (searchText !== "") {
      conditions.push(`検索：${searchText}`);
    }

    if (selectedCounts.length > 0) {
      const countLabels = selectedCounts.map(count => {
        if (count === "1") return "ソロ";
        if (count === "5") return "5人以上";
        return `${count}人`;
      });

      conditions.push(...countLabels);
    }

    if (selectedTypes.length > 0) {
      const typeLabels = selectedTypes.map(type => {
        return type === "original"
          ? "オリジナル"
          : "カバー";
      });

      conditions.push(...typeLabels);
    }

    if (selectedUnits.length > 0) {
      conditions.push(...selectedUnits);
    }

    activeSearchConditions.innerHTML = conditions
      .map(condition =>
        `<span class="active-search-tag">${condition}</span>`
      )
      .join("");
  }

  const searchEmptyMessage =
    document.getElementById("searchEmptyMessage");

  const favoriteEmptyMessage =
    document.getElementById("favoriteEmptyMessage");

  const visibleSongs = Array.from(songs)
    .filter(song => song.style.display !== "none");

  if (searchEmptyMessage) {
    searchEmptyMessage.style.display =
      visibleSongs.length === 0
        ? "block"
        : "none";
  }

  if (favoriteEmptyMessage) {
    favoriteEmptyMessage.style.display = "none";
  }

  sortSongs();
}


function updateSearchResult() {
  const allSongs =
    document.querySelectorAll(".song");

  const visibleSongs =
    Array.from(allSongs).filter(
      song => song.style.display !== "none"
    );

  const resultCount =
    document.getElementById("searchResultCount");

  if (resultCount) {
    resultCount.textContent =
      `全${allSongs.length}曲中 ${visibleSongs.length}曲ヒットしました`;
  }
}


/* =========================
   歌唱ユニットの生成
   ========================= */

function createUnitFilters() {
  const unitFilters =
    document.getElementById("unitFilters");

  if (!unitFilters || !Array.isArray(window.songData)) {
    return;
  }

  const units = [...new Set(
    songData
      .map(song => song.unit)
      .filter(unit => unit)
  )];

  units.sort((a, b) =>
    String(a).localeCompare(String(b), "ja")
  );

  unitFilters.innerHTML = "";

  units.forEach(unit => {
    const label = document.createElement("label");

    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = "unit";
    input.value = unit;

    label.appendChild(input);
    label.appendChild(
      document.createTextNode(` ${unit}`)
    );

    unitFilters.appendChild(label);

    input.addEventListener(
      "change",
      filterSongs
    );
  });
}


/* =========================
   お気に入り
   ========================= */

function getFavorites() {
  try {
    return JSON.parse(
      localStorage.getItem("favoriteSongs") || "[]"
    );
  } catch {
    return [];
  }
}


function saveFavorites(favorites) {
  localStorage.setItem(
    "favoriteSongs",
    JSON.stringify(favorites)
  );
}


function updateCardFavoriteButton(song) {
  const button =
    song.querySelector(".favorite-button");

  if (!button) return;

  const title =
    song.querySelector("h3")?.textContent.trim() || "";

  const favorites = getFavorites();

  if (favorites.includes(title)) {
    button.textContent = "♥";
    button.classList.add("is-favorite");
    button.setAttribute(
      "aria-label",
      "お気に入り解除"
    );
  } else {
    button.textContent = "♡";
    button.classList.remove("is-favorite");
    button.setAttribute(
      "aria-label",
      "お気に入り登録"
    );
  }
}


function updateFavoriteButton(song) {
  if (!popupFavorite || !song) return;

  const title =
    song.querySelector("h3")?.textContent.trim() || "";

  const favorites = getFavorites();

  if (favorites.includes(title)) {
    popupFavorite.textContent =
      "♥ お気に入り解除";
    popupFavorite.classList.add("is-favorite");
  } else {
    popupFavorite.textContent =
      "♡ お気に入り登録";
    popupFavorite.classList.remove("is-favorite");
  }
}


/* =========================
   YouTubeプレイヤー
   ========================= */

let youtubePlayer = null;
let youtubeReady = false;
let currentSong = null;

let loopMode = 0;
// 0 = OFF
// 1 = 1曲リピート
// 2 = 全体リピート

let shuffleMode = false;
let shufflePlayedSongs = [];


function loadYouTubeAPI() {
  if (document.getElementById("youtube-api-script")) {
    return;
  }

  const script = document.createElement("script");

  script.id = "youtube-api-script";
  script.src =
    "https://www.youtube.com/iframe_api";

  document.head.appendChild(script);
}


window.onYouTubeIframeAPIReady = function() {
  youtubeReady = true;
};


function createYouTubePlayer(videoId, startTime) {
  if (!youtubeReady || typeof YT === "undefined") {
    setTimeout(
      () => createYouTubePlayer(videoId, startTime),
      100
    );
    return;
  }

  if (youtubePlayer) {
    youtubePlayer.loadVideoById({
      videoId: videoId,
      startSeconds: Number(startTime) || 0
    });

    setTimeout(() => {
      tryPlayYouTube();
    }, 500);

    return;
  }

  youtubePlayer = new YT.Player(
    "youtubePlayer",
    {
      width: "100%",
      height: "100%",
      videoId: videoId,
      playerVars: {
        start: Number(startTime) || 0,
        playsinline: 1,
        rel: 0
      },
      events: {
        onReady: event => {
          event.target.playVideo();
        },

        onStateChange: event => {
          updatePlayButtons(event.data);

          if (
            event.data ===
            YT.PlayerState.PLAYING
          ) {
            updateSeekBar();
          }

          if (
            event.data ===
            YT.PlayerState.ENDED
          ) {
            handleSongEnded();
          }
        }
      }
    }
  );
}


function tryPlayYouTube() {
  if (!youtubePlayer) return;

  const state =
    youtubePlayer.getPlayerState();

  if (
    state !== YT.PlayerState.PLAYING
  ) {
    youtubePlayer.playVideo();
  }
}


/* =========================
   再生終了時の処理
   ========================= */

function handleSongEnded() {
  if (!currentSong) return;

  if (loopMode === 1) {
    const button =
      currentSong.querySelector(".play-button");

    const startTime =
      Number(button?.dataset.start || 0);

    youtubePlayer.seekTo(
      startTime,
      true
    );

    youtubePlayer.playVideo();

    return;
  }

  const songs =
    Array.from(
      document.querySelectorAll(".song")
    ).filter(
      song => song.style.display !== "none"
    );

  if (songs.length === 0) return;

  if (shuffleMode) {
    let unplayedSongs =
      songs.filter(
        song =>
          !shufflePlayedSongs.includes(song)
      );

    if (unplayedSongs.length === 0) {
      shufflePlayedSongs = [];

      unplayedSongs =
        songs.filter(
          song => song !== currentSong
        );
    }

    if (unplayedSongs.length === 0) {
      return;
    }

    const randomIndex =
      Math.floor(
        Math.random() *
        unplayedSongs.length
      );

    const randomSong =
      unplayedSongs[randomIndex];

    shufflePlayedSongs.push(randomSong);

    playSong(randomSong, false);

    return;
  }

  if (loopMode === 2) {
    const index =
      songs.indexOf(currentSong);

    const nextIndex =
      index >= 0 &&
      index < songs.length - 1
        ? index + 1
        : 0;

    playSong(
      songs[nextIndex],
      false
    );
  }
}


/* =========================
   時間表示
   ========================= */

function parseTime(time) {
  if (typeof time === "number") {
    return time;
  }

  if (!time) return 0;

  const parts =
    String(time)
      .split(":")
      .map(Number);

  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }

  if (parts.length === 3) {
    return (
      parts[0] * 3600 +
      parts[1] * 60 +
      parts[2]
    );
  }

  return Number(time) || 0;
}


function formatTime(seconds) {
  seconds =
    Math.floor(seconds || 0);

  const minutes =
    Math.floor(seconds / 60);

  const remainingSeconds =
    seconds % 60;

  return `${minutes}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}


/* =========================
   シークバー
   ========================= */

function updateSeekBar() {
  if (!youtubePlayer || !currentSong) {
    return;
  }

  const playButton =
    currentSong.querySelector(
      ".play-button"
    );

  const startTime =
    Number(
      playButton?.dataset.start || 0
    );

  const endTime =
    Number(
      playButton?.dataset.end || 0
    );

  const currentTime =
    youtubePlayer.getCurrentTime() || 0;

  const seekBar =
    document.getElementById(
      "popupSeekBar"
    );

  const currentTimeDisplay =
    document.getElementById(
      "popupCurrentTime"
    );

  const durationDisplay =
    document.getElementById(
      "popupDuration"
    );

  if (
    !seekBar ||
    !currentTimeDisplay ||
    !durationDisplay
  ) {
    return;
  }

  if (endTime > startTime) {
    const songDuration =
      endTime - startTime;

    const songCurrentTime =
      Math.max(
        0,
        currentTime - startTime
      );

    seekBar.min = 0;
    seekBar.max = songDuration;
    seekBar.value =
      Math.min(
        songCurrentTime,
        songDuration
      );

    currentTimeDisplay.textContent =
      formatTime(songCurrentTime);

    durationDisplay.textContent =
      formatTime(songDuration);

    if (currentTime >= endTime) {
      youtubePlayer.pauseVideo();
      handleSongEnded();
      return;
    }
  } else {
    const duration =
      youtubePlayer.getDuration() || 0;

    if (duration > 0) {
      seekBar.min = 0;
      seekBar.max = duration;
      seekBar.value = currentTime;

      durationDisplay.textContent =
        formatTime(duration);
    }

    currentTimeDisplay.textContent =
      formatTime(currentTime);
  }

  if (
    youtubePlayer.getPlayerState() ===
    YT.PlayerState.PLAYING
  ) {
    requestAnimationFrame(
      updateSeekBar
    );
  }
}


/* =========================
   再生
   ========================= */

function playSong(
  song,
  openPopup = true
) {
  const playButton =
    song.querySelector(".play-button");

  if (!playButton) return;

  const title =
    song.querySelector("h3")?.textContent.trim() || "";

  const videoId =
    playButton.dataset.video;

  const startTime =
    parseTime(
      playButton.dataset.start || 0
    );

  currentSong = song;

  miniPlayerTitle.textContent =
    title;

  miniPlayerImage.src =
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  miniPlayerImage.alt = title;

  popupSongTitle.textContent =
    title;

  popupSongYear.textContent =
    song.dataset.date
      ? `${song.dataset.date.substring(0, 4)}年`
      : "";

  popupOriginalArtist.textContent =
    song.querySelector(
      "p:nth-of-type(1)"
    )?.textContent.trim() || "";

  popupSinger.textContent =
    song.querySelector(
      "p:nth-of-type(2)"
    )?.textContent.trim() || "";

  updateFavoriteButton(song);

  popupOriginal.href =
    `https://www.youtube.com/watch?v=${videoId}`;

  if (openPopup) {
    musicPopup.classList.add("active");
  }

  updatePlayButtons(-1);

  createYouTubePlayer(
    videoId,
    startTime
  );
}


/* =========================
   並べ替え
   ========================= */

function sortSongs() {
  const songList =
    document.getElementById("songList");

  const sortSelect =
    document.getElementById("sortSelect");

  if (!songList || !sortSelect) {
    return;
  }

  const songs =
    Array.from(
      songList.querySelectorAll(".song")
    );

  const sortType =
    sortSelect.value;

  songs.sort((a, b) => {
    if (sortType === "date-asc") {
      return a.dataset.date.localeCompare(
        b.dataset.date
      );
    }

    if (sortType === "date-desc") {
      return b.dataset.date.localeCompare(
        a.dataset.date
      );
    }

    const titleA =
      a.querySelector("h3")
        ?.textContent.trim() || "";

    const titleB =
      b.querySelector("h3")
        ?.textContent.trim() || "";

    if (sortType === "title-asc") {
      return titleA.localeCompare(
        titleB,
        "ja"
      );
    }

    if (sortType === "title-desc") {
      return titleB.localeCompare(
        titleA,
        "ja"
      );
    }

    return 0;
  });

  songs.forEach(song => {
    songList.appendChild(song);
  });
}


/* =========================
   楽曲カード作成
   ========================= */

function createSongCard(song) {
  const songElement =
    document.createElement("div");

  songElement.className = "song";

  songElement.dataset.count =
    song.count || "";

  songElement.dataset.type =
    song.type || "";

  songElement.dataset.date =
    song.date || "";

  songElement.dataset.unit =
    song.unit || "";

  const year =
    song.date
      ? song.date.substring(0, 4)
      : "";

  songElement.innerHTML = `
    <div class="song-card">
      <h3>${song.title}</h3>

      <div class="song-tags">
        <span class="song-tag">
          ${year}年
        </span>

        <span class="song-tag">
          ${
            song.type === "original"
              ? "オリジナル"
              : "カバー"
          }
        </span>
      </div>

      <p>原曲：${song.artist || ""}</p>
      <p>歌唱：${song.singer || ""}</p>

      <button
        type="button"
        class="play-button"
        data-title="${song.title}"
        data-video="${song.video}"
        data-start="${song.start || ""}"
        data-end="${song.end || ""}"
      >
        ▶ 再生
      </button>

      <button
        type="button"
        class="favorite-button"
        aria-label="お気に入り登録"
      >
        ♡
      </button>
    </div>
  `;

  return songElement;
}


/* =========================
   初期化
   ========================= */

let miniPlayer;
let miniPlayerTitle;
let miniPlayerImage;
let playPauseButton;
let previousButton;
let nextButton;

let musicPopup;
let popupSongTitle;
let popupSongYear;
let popupOriginalArtist;
let popupSinger;
let popupPlayPause;
let popupLoop;
let popupShuffle;
let popupFavorite;
let popupOriginal;


document.addEventListener(
  "DOMContentLoaded",
  () => {
    loadYouTubeAPI();

    miniPlayer =
      document.getElementById(
        "miniPlayer"
      );

    miniPlayerTitle =
      document.getElementById(
        "miniPlayerTitle"
      );

    miniPlayerImage =
      document.getElementById(
        "miniPlayerImage"
      );

    playPauseButton =
      document.getElementById(
        "playPauseButton"
      );

    previousButton =
      document.getElementById(
        "previousButton"
      );

    nextButton =
      document.getElementById(
        "nextButton"
      );

    createMusicPopup();
    createUnitFilters();
    createSongList();
    setupSearch();
    setupFavorites();
    setupSort();
    setupPlaybackControls();

    filterSongs();
  }
);


/* =========================
   ポップアップ
   ========================= */

function createMusicPopup() {
  musicPopup =
    document.createElement("div");

  musicPopup.id = "musicPopup";

  musicPopup.innerHTML = `
    <div id="musicPopupOverlay"></div>

    <div id="musicPopupContent">
      <div id="popupVideoContainer">
        <div id="youtubePlayer"></div>
      </div>

      <div id="popupSongTitle"></div>
      <div id="popupSongYear"></div>
      <div id="popupOriginalArtist"></div>
      <div id="popupSinger"></div>

      <div id="popupSeekArea">
        <span id="popupCurrentTime">
          0:00
        </span>

        <input
          type="range"
          id="popupSeekBar"
          min="0"
          max="100"
          value="0"
          step="0.1"
        >

        <span id="popupDuration">
          0:00
        </span>
      </div>

      <div id="popupControls">
        <button
          type="button"
          id="popupLoop"
          aria-label="ループ再生"
        >
          🔁
        </button>

        <button
          type="button"
          id="popupPrevious"
          aria-label="前の曲"
        >
          ⏮️
        </button>

        <button
          type="button"
          id="popupPlayPause"
          aria-label="再生"
        >
          ▶️
        </button>

        <button
          type="button"
          id="popupNext"
          aria-label="次の曲"
        >
          ⏭️
        </button>

        <button
          type="button"
          id="popupShuffle"
          aria-label="シャッフル再生"
        >
          🔀
        </button>
      </div>

      <div id="popupActions">
        <button
          type="button"
          id="popupFavorite"
        >
          ♡ お気に入り登録
        </button>

        <a
          id="popupOriginal"
          href="#"
          target="_blank"
          rel="noopener"
        >
          ↗ 元動画を見る
        </a>

        <button
          type="button"
          id="musicPopupClose"
        >
          × 閉じる
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(
    musicPopup
  );

  popupSongTitle =
    document.getElementById(
      "popupSongTitle"
    );

  popupSongYear =
    document.getElementById(
      "popupSongYear"
    );

  popupOriginalArtist =
    document.getElementById(
      "popupOriginalArtist"
    );

  popupSinger =
    document.getElementById(
      "popupSinger"
    );

  popupPlayPause =
    document.getElementById(
      "popupPlayPause"
    );

  popupLoop =
    document.getElementById(
      "popupLoop"
    );

  popupShuffle =
    document.getElementById(
      "popupShuffle"
    );

  popupFavorite =
    document.getElementById(
      "popupFavorite"
    );

  popupOriginal =
    document.getElementById(
      "popupOriginal"
    );

  document
    .getElementById(
      "musicPopupClose"
    )
    .addEventListener(
      "click",
      () => {
        musicPopup.classList.remove(
          "active"
        );
      }
    );

  document
    .getElementById(
      "musicPopupOverlay"
    )
    .addEventListener(
      "click",
      () => {
        musicPopup.classList.remove(
          "active"
        );
      }
    );

  const seekBar =
    document.getElementById(
      "popupSeekBar"
    );

  seekBar.addEventListener(
    "input",
    event => {
      if (!youtubePlayer || !currentSong) {
        return;
      }

      const button =
        currentSong.querySelector(
          ".play-button"
        );

      const startTime =
        Number(
          button?.dataset.start || 0
        );

      const endTime =
        Number(
          button?.dataset.end || 0
        );

      if (endTime > startTime) {
        youtubePlayer.seekTo(
          startTime +
            Number(event.target.value),
          true
        );
      } else {
        youtubePlayer.seekTo(
          Number(event.target.value),
          true
        );
      }
    }
  );
}


/* =========================
   検索関連
   ========================= */

function setupSearch() {
  document
    .querySelectorAll(
      'input[name="memberCount"], input[name="songType"], input[name="unit"]'
    )
    .forEach(checkbox => {
      checkbox.addEventListener(
        "change",
        filterSongs
      );
    });

  document
    .querySelectorAll(
      ".clear-filter-button"
    )
    .forEach(button => {
      button.addEventListener(
        "click",
        event => {
          event.stopPropagation();

          const filterName =
            button.dataset.filter;

          document
            .querySelectorAll(
              `input[name="${filterName}"]`
            )
            .forEach(checkbox => {
              checkbox.checked = false;
            });

          filterSongs();
        }
      );
    });

  const searchButton =
    document.getElementById(
      "searchButton"
    );

  const searchResultCount =
    document.getElementById(
      "searchResultCount"
    );

  if (searchButton) {
    searchButton.addEventListener(
      "click",
      () => {
        filterSongs();

        searchResultCount?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    );
  }

  const clearSearchButton =
    document.getElementById(
      "clearSearchButton"
    );

  if (clearSearchButton) {
    clearSearchButton.addEventListener(
      "click",
      event => {
        event.stopPropagation();

        const input =
          document.getElementById(
            "songSearch"
          );

        if (input) {
          input.value = "";
        }

        filterSongs();
      }
    );
  }

  const searchToggle =
    document.getElementById(
      "searchToggle"
    );

  const searchArea =
    document.querySelector(
      ".search-area"
    );

  const searchToggleIcon =
    document.getElementById(
      "searchToggleIcon"
    );

  if (
    searchToggle &&
    searchArea &&
    searchToggleIcon
  ) {
    searchToggle.addEventListener(
      "click",
      () => {
        searchArea.classList.toggle(
          "open"
        );

        searchToggleIcon.textContent =
          searchArea.classList.contains(
            "open"
          )
            ? "−"
            : "＋";
      }
    );
  }
}


/* =========================
   お気に入り設定
   ========================= */

function setupFavorites() {
  document
    .querySelectorAll(".song")
    .forEach(song => {
      updateCardFavoriteButton(song);
    });

  document.addEventListener(
    "click",
    event => {
      const button =
        event.target.closest(
          ".favorite-button"
        );

      if (!button) return;

      event.stopPropagation();

      const song =
        button.closest(".song");

      if (!song) return;

      const title =
        song.querySelector(
          "h3"
        )?.textContent.trim() || "";

      const favorites =
        getFavorites();

      if (
        favorites.includes(title)
      ) {
        saveFavorites(
          favorites.filter(
            item => item !== title
          )
        );
      } else {
        favorites.push(title);
        saveFavorites(favorites);
      }

      updateCardFavoriteButton(song);

      if (currentSong === song) {
        updateFavoriteButton(song);
      }

      if (
        document
          .getElementById(
            "favoriteSongsTab"
          )
          ?.classList.contains("active")
      ) {
        showFavoriteSongs();
      }
    }
  );

  if (popupFavorite) {
    popupFavorite.addEventListener(
      "click",
      event => {
        event.stopPropagation();

        if (!currentSong) return;

        const title =
          currentSong
            .querySelector("h3")
            ?.textContent.trim() || "";

        const favorites =
          getFavorites();

        if (
          favorites.includes(title)
        ) {
          saveFavorites(
            favorites.filter(
              item => item !== title
            )
          );
        } else {
          favorites.push(title);
          saveFavorites(favorites);
        }

        updateFavoriteButton(
          currentSong
        );

        updateCardFavoriteButton(
          currentSong
        );

        if (
          document
            .getElementById(
              "favoriteSongsTab"
            )
            ?.classList.contains("active")
        ) {
          showFavoriteSongs();
        }
      }
    );
  }
}


/* =========================
   楽曲一覧
   ========================= */

function createSongList() {
  const songList =
    document.getElementById(
      "songList"
    );

  if (
    !songList ||
    !Array.isArray(window.songData)
  ) {
    return;
  }

  songList.innerHTML = "";

  songData.forEach(song => {
    songList.appendChild(
      createSongCard(song)
    );
  });
}


/* =========================
   再生ボタン
   ========================= */

function setupPlaybackControls() {
  document.addEventListener(
    "click",
    event => {
      const button =
        event.target.closest(
          ".play-button"
        );

      if (!button) return;

      event.stopPropagation();

      const song =
        button.closest(".song");

      if (!song) return;

      playSong(song);
    }
  );

  if (playPauseButton) {
    playPauseButton.addEventListener(
      "click",
      event => {
        event.stopPropagation();
        togglePlayPause();
      }
    );
  }

  if (popupPlayPause) {
    popupPlayPause.addEventListener(
      "click",
      event => {
        event.stopPropagation();
        togglePlayPause();
      }
    );
  }

  if (previousButton) {
    previousButton.addEventListener(
      "click",
      event => {
        event.stopPropagation();
        playPreviousSong();
      }
    );
  }

  if (nextButton) {
    nextButton.addEventListener(
      "click",
      event => {
        event.stopPropagation();
        playNextSong();
      }
    );
  }

  const popupPrevious =
    document.getElementById(
      "popupPrevious"
    );

  const popupNext =
    document.getElementById(
      "popupNext"
    );

  popupPrevious?.addEventListener(
    "click",
    event => {
      event.stopPropagation();
      playPreviousSong();
    }
  );

  popupNext?.addEventListener(
    "click",
    event => {
      event.stopPropagation();
      playNextSong();
    }
  );

  popupLoop?.addEventListener(
    "click",
    event => {
      event.stopPropagation();

      loopMode++;

      if (loopMode > 2) {
        loopMode = 0;
      }

      updateLoopButton();
    }
  );

  popupShuffle?.addEventListener(
    "click",
    event => {
      event.stopPropagation();

      shuffleMode =
        !shuffleMode;

      shufflePlayedSongs = [];

      updateShuffleButtons();
    }
  );

  const pageShuffleButton =
    document.getElementById(
      "pageShuffleButton"
    );

  pageShuffleButton?.addEventListener(
    "click",
    event => {
      event.stopPropagation();

      shuffleMode =
        !shuffleMode;

      shufflePlayedSongs = [];

      updateShuffleButtons();

      const songs =
        getVisibleSongs();

      if (songs.length === 0) {
        return;
      }

      const randomSong =
        songs[
          Math.floor(
            Math.random() *
            songs.length
          )
        ];

      shufflePlayedSongs.push(
        randomSong
      );

      playSong(randomSong);
    }
  );

  if (miniPlayer) {
    miniPlayer.addEventListener(
      "click",
      event => {
        if (
          event.target.closest("button")
        ) {
          return;
        }

        if (!currentSong) {
          return;
        }

        musicPopup.classList.add(
          "active"
        );
      }
    );
  }
}


function togglePlayPause() {
  if (!youtubePlayer) return;

  const state =
    youtubePlayer.getPlayerState();

  if (
    state === YT.PlayerState.PLAYING
  ) {
    youtubePlayer.pauseVideo();
  } else {
    youtubePlayer.playVideo();
  }
}


function getVisibleSongs() {
  return Array.from(
    document.querySelectorAll(".song")
  ).filter(
    song =>
      song.style.display !== "none"
  );
}


function playPreviousSong() {
  if (!currentSong) return;

  const songs =
    getVisibleSongs();

  const index =
    songs.indexOf(currentSong);

  if (index > 0) {
    const popupOpen =
      musicPopup.classList.contains(
        "active"
      );

    playSong(
      songs[index - 1],
      popupOpen
    );
  }
}


function playNextSong() {
  if (!currentSong) return;

  const songs =
    getVisibleSongs();

  if (songs.length === 0) {
    return;
  }

  if (shuffleMode) {
    let unplayedSongs =
      songs.filter(
        song =>
          !shufflePlayedSongs.includes(
            song
          )
      );

    if (
      unplayedSongs.length === 0
    ) {
      shufflePlayedSongs = [];

      unplayedSongs =
        songs.filter(
          song =>
            song !== currentSong
        );
    }

    if (
      unplayedSongs.length === 0
    ) {
      return;
    }

    const randomSong =
      unplayedSongs[
        Math.floor(
          Math.random() *
          unplayedSongs.length
        )
      ];

    shufflePlayedSongs.push(
      randomSong
    );

    const popupOpen =
      musicPopup.classList.contains(
        "active"
      );

    playSong(
      randomSong,
      popupOpen
    );

    return;
  }

  const index =
    songs.indexOf(currentSong);

  if (
    index >= 0 &&
    index < songs.length - 1
  ) {
    const popupOpen =
      musicPopup.classList.contains(
        "active"
      );

    playSong(
      songs[index + 1],
      popupOpen
    );
  }
}


/* =========================
   再生ボタン表示
   ========================= */

function updatePlayButtons(state) {
  if (!playPauseButton) return;
  if (!popupPlayPause) return;

  if (
    state ===
    YT.PlayerState.PLAYING
  ) {
    playPauseButton.classList.add(
      "playing"
    );

    playPauseButton.textContent =
      "⏸️";

    popupPlayPause.textContent =
      "⏸️";
  } else {
    playPauseButton.classList.remove(
      "playing"
    );

    playPauseButton.textContent =
      "▶️";

    popupPlayPause.textContent =
      "▶️";
  }
}


function updateLoopButton() {
  if (!popupLoop) return;

  if (loopMode === 1) {
    popupLoop.textContent = "🔂";
    popupLoop.classList.add(
      "loop-active"
    );
  } else if (loopMode === 2) {
    popupLoop.textContent = "🔁";
    popupLoop.classList.add(
      "loop-active"
    );
  } else {
    popupLoop.textContent = "🔁";
    popupLoop.classList.remove(
      "loop-active"
    );
  }
}


function updateShuffleButtons() {
  const pageShuffleButton =
    document.getElementById(
      "pageShuffleButton"
    );

  if (shuffleMode) {
    popupShuffle?.classList.add(
      "shuffle-active"
    );

    pageShuffleButton?.classList.add(
      "shuffle-active"
    );
  } else {
    popupShuffle?.classList.remove(
      "shuffle-active"
    );

    pageShuffleButton?.classList.remove(
      "shuffle-active"
    );
  }
}


/* =========================
   タブ
   ========================= */

function setupSort() {
  const sortSelect =
    document.getElementById(
      "sortSelect"
    );

  if (!sortSelect) return;

  const savedSort =
    localStorage.getItem(
      "songSort"
    ) || "date-asc";

  sortSelect.value =
    savedSort;

  sortSelect.addEventListener(
    "change",
    () => {
      localStorage.setItem(
        "songSort",
        sortSelect.value
      );

      sortSongs();
    }
  );

  sortSongs();

  const allSongsTab =
    document.getElementById(
      "allSongsTab"
    );

  const favoriteSongsTab =
    document.getElementById(
      "favoriteSongsTab"
    );

  allSongsTab?.addEventListener(
    "click",
    () => {
      allSongsTab.classList.add(
        "active"
      );

      favoriteSongsTab?.classList.remove(
        "active"
      );

      filterSongs();
    }
  );

  favoriteSongsTab?.addEventListener(
    "click",
    () => {
      favoriteSongsTab.classList.add(
        "active"
      );

      allSongsTab?.classList.remove(
        "active"
      );

      showFavoriteSongs();
    }
  );
}


function showFavoriteSongs() {
  const favorites =
    getFavorites();

  const songs =
    document.querySelectorAll(
      ".song"
    );

  songs.forEach(song => {
    const title =
      song.querySelector(
        "h3"
      )?.textContent.trim() || "";

    song.style.display =
      favorites.includes(title)
        ? ""
        : "none";
  });

  const visibleSongs =
    getVisibleSongs();

  const resultCount =
    document.getElementById(
      "searchResultCount"
    );

  if (resultCount) {
    resultCount.textContent =
      `お気に入り ${visibleSongs.length}曲`;
  }

  const favoriteEmptyMessage =
    document.getElementById(
      "favoriteEmptyMessage"
    );

  const searchEmptyMessage =
    document.getElementById(
      "searchEmptyMessage"
    );

  if (favoriteEmptyMessage) {
    favoriteEmptyMessage.style.display =
      visibleSongs.length === 0
        ? "block"
        : "none";
  }

  if (searchEmptyMessage) {
    searchEmptyMessage.style.display =
      "none";
  }

  sortSongs();
}
