const ingredientDescriptions = {
  wheat: {
    label: "SŁÓD:",
    text: "\u201eNadaje piwu lekką pełnię, jasną barwę oraz delikatny, zbożowy charakter z subtelną nutą chleba i świeżego pieczywa.\u201d"
  },
  orange: {
    label: "CURACAO:",
    text: "\u201eDodaje świeży, cytrusowy aromat oraz lekką owocową słodycz, będącą znakiem rozpoznawczym stylu Witbier.\u201d"
  },
  coriander: {
    label: "KOLENDRA:",
    text: "\u201eWzbogaca piwo o subtelne, korzenne nuty z cytrusowym akcentem, nadając mu charakterystyczny belgijski profil.\u201d"
  },
  hops: {
    label: "CHMIELE SAAZ + PALISADE:",
    text: "\u201eWnosi łagodną goryczkę oraz delikatny, ziołowo-kwiatowy aromat, który podkreśla orzeźwiający charakter piwa.\u201d"
  }
};

const moodDescriptions = {
  weekend: "Weekend oficjalnie odblokowany. Schłodź do 7°C, nalej powoli i zostaw trochę miejsca na pyszną pianę.",
  friends: "Najlepiej smakuje w środku rozmowy. Wstaw butelki do wiaderka z lodem i daj ludziom opowiadać historie.",
  quiet: "Wersja spokojna: jeden ulubiony kufel, 7°C i czas na wychwycenie kolendry w drugim łyku."
};

// 40 ciekawostek — jedna na każdą butelkę
const bottleFacts = [
  "Butelka 01/40 · Czym jest Witbier? Witbier to tradycyjny belgijski styl piwa pszenicznego, warzony z dużym dodatkiem niesłodowanej pszenicy — naturalnie mętny i wyjątkowo orzeźwiający.",
  "Butelka 02/40 · Skąd nazwa \u201ebiałe piwo\u201d? Witbier oznacza po niderlandzku \u201ebiałe piwo\u201d, choć ma jasnozłoty kolor. Określenie odnosi się do jego mlecznej, mętnej barwy.",
  "Butelka 03/40 · Nie każde piwo musi być klarowne. W przypadku Witbiera lekkie zmętnienie jest oznaką stylu, a nie wadą piwa.",
  "Butelka 04/40 · Dlaczego dodaje się kolendrę? Nasiona kolendry nadają piwu subtelny cytrusowo-korzenny aromat — jedną z cech charakterystycznych belgijskiego Witbiera.",
  "Butelka 05/40 · Skórka pomarańczy ma znaczenie. W klasycznych recepturach wykorzystuje się gorzką skórkę pomarańczy Curaçao, która dodaje świeżości i lekkiej owocowej goryczki.",
  "Butelka 06/40 · Piwo ma ponad 5000 lat. Najstarsze dowody warzenia piwa pochodzą z Mezopotamii i liczą ponad pięć tysięcy lat.",
  "Butelka 07/40 · Drożdże to żywe organizmy. To właśnie one zamieniają cukry w alkohol i dwutlenek węgla, tworząc jednocześnie setki aromatów.",
  "Butelka 08/40 · Piwo ma cztery podstawowe składniki. Woda, słód, chmiel i drożdże — z tych czterech elementów można stworzyć tysiące różnych stylów piwa.",
  "Butelka 09/40 · Chmiel to kuzyn konopi. Obie rośliny należą do tej samej rodziny botanicznej — konopiowatych.",
  "Butelka 10/40 · Goryczka nie zawsze oznacza mocniejsze piwo. O poziomie goryczki informuje wskaźnik IBU, który nie ma związku z zawartością alkoholu.",
  "Butelka 11/40 · Co oznacza °Blg? Stopnie Ballinga określają ilość cukrów w brzeczce przed fermentacją, a nie procent alkoholu.",
  "Butelka 12/40 · Najwięcej w piwie jest... wody. W zależności od stylu stanowi ona około 90–95% całego napoju.",
  "Butelka 13/40 · Pszenica odpowiada za pianę. Dzięki wysokiej zawartości białek piwa pszeniczne tworzą wyjątkowo trwałą i gęstą pianę.",
  "Butelka 14/40 · Belgowie uratowali Witbiera. Styl niemal zniknął w XX wieku. Odrodził go belgijski piwowar Pierre Celis.",
  "Butelka 15/40 · Nie wszystkie piwa są filtrowane. Witbier zazwyczaj pozostaje niefiltrowany, dzięki czemu zachowuje pełniejszy smak.",
  "Butelka 16/40 · Każdy szczep drożdży smakuje inaczej. Różne drożdże mogą tworzyć aromaty banana, goździków, jabłek czy pieprzu.",
  "Butelka 17/40 · Dlaczego piwo się pieni? Piana powstaje dzięki dwutlenkowi węgla oraz białkom pochodzącym głównie ze słodu i pszenicy.",
  "Butelka 18/40 · Idealna temperatura ma znaczenie. Witbier najlepiej smakuje schłodzony do około 6–8°C.",
  "Butelka 19/40 · Słód decyduje o kolorze. Im mocniej prażony słód, tym ciemniejszy kolor piwa.",
  "Butelka 20/40 · Nie każdy chmiel daje goryczkę. Niektóre odmiany stosuje się głównie dla aromatu cytrusów, kwiatów lub owoców tropikalnych.",
  "Butelka 21/40 · Belgia słynie z piwa. W Belgii istnieje ponad 150 uznanych stylów i odmian piwa.",
  "Butelka 22/40 · Witbier to piwo letnie. Dzięki lekkiej budowie i cytrusowym nutom jest jednym z najbardziej orzeźwiających stylów piwa.",
  "Butelka 23/40 · Naturalne nagazowanie. Wiele piw rzemieślniczych uzyskuje bąbelki dzięki refermentacji już w butelce.",
  "Butelka 24/40 · Każda szklanka wpływa na smak. Odpowiedni kształt szkła pomaga uwolnić aromaty piwa.",
  "Butelka 25/40 · Piwo ma własne święto. Międzynarodowy Dzień Piwa obchodzony jest w pierwszy piątek sierpnia.",
  "Butelka 26/40 · Chmiel chroni piwo. Dawniej dodawano go głównie dlatego, że wydłużał trwałość piwa dzięki właściwościom antybakteryjnym.",
  "Butelka 27/40 · Słód powstaje z kiełkującego ziarna. Proces słodowania aktywuje enzymy potrzebne do późniejszego zacierania.",
  "Butelka 28/40 · Drożdże pracują w ciszy. Podczas fermentacji wykonują ogromną pracę, choć często jedynym widocznym efektem są bąbelki i piana.",
  "Butelka 29/40 · Piwo to chemia i biologia jednocześnie. Warzenie łączy procesy enzymatyczne, fermentację i kontrolę temperatury.",
  "Butelka 30/40 · Nie każde piwo było kiedyś chmielone. Zanim zaczęto używać chmielu, piwowarzy dodawali mieszanki ziół zwane gruit.",
  "Butelka 31/40 · Belgia ma piwną kulturę UNESCO. Belgijska kultura piwowarska została wpisana na listę niematerialnego dziedzictwa UNESCO.",
  "Butelka 32/40 · Najważniejszy składnik jest niewidoczny. Odpowiednia jakość wody ma ogromny wpływ na smak gotowego piwa.",
  "Butelka 33/40 · Piwo oddycha aromatem. Dlatego warto nalać je do szkła, zamiast pić bezpośrednio z butelki.",
  "Butelka 34/40 · Witbier nie jest Weizenem. Belgijski Witbier i niemiecki Hefeweizen różnią się recepturą, drożdżami i przyprawami.",
  "Butelka 35/40 · Aromat powstaje podczas fermentacji. To nie tylko chmiel — ogromny wpływ na zapach mają również drożdże.",
  "Butelka 36/40 · Piwo zmienia się z czasem. Nawet po zabutelkowaniu jego smak może delikatnie ewoluować.",
  "Butelka 37/40 · Świeżość ma znaczenie. Piwa pszeniczne najlepiej smakują młode, gdy zachowują pełnię cytrusowych i zbożowych aromatów.",
  "Butelka 38/40 · Domowe piwowarstwo przeżywa renesans. Coraz więcej osób warzy własne piwo, eksperymentując z nowymi składnikami i stylami.",
  "Butelka 39/40 · Każda warka jest wyjątkowa. Nawet przy identycznej recepturze dwie warki mogą delikatnie różnić się smakiem i aromatem.",
  "Butelka 40/40 · Ostatnia butelka! Właśnie trzymasz jedną z 40 butelek Lucky Wheat — domowego Witbiera stworzonego z pasji do piwowarstwa. Dzięki za wspólne odkrywanie świata piwa! 🍺"
];

const demoMemories = [
  { author: "Pierwszy łyk", text: "Pomarańcza, pszenica i lato w jednym kuflu. Bardzo udany debiut!", date: "notatka degustacyjna", tilt: "-1deg" },
  { author: "Zasada nr 1", text: "Najpierw schłodzić. Potem znaleźć ludzi. Reszta wydarza się sama.", date: "Lucky Wheat", tilt: "1.2deg" },
  { author: "Witbier 101", text: "Naturalna mętność nie jest błędem — to zaproszenie do następnego łyku.", date: "ciekawostka", tilt: "-.6deg" },
  { author: "Warka 01/2026", text: "40 butelek, mnóstwo spotkań i zero pośpiechu. Na zdrowie.", date: "KLIMAS", tilt: ".7deg" }
];

const supabaseSettings = window.LUCKY_WHEAT_SUPABASE || {};
const isSupabaseConfigured = Boolean(supabaseSettings.url && supabaseSettings.anonKey && window.supabase);
const supabaseClient = isSupabaseConfigured
  ? window.supabase.createClient(supabaseSettings.url, supabaseSettings.anonKey)
  : null;

const storageKey = "lucky-wheat-local-memories";
let selectedPhoto = null;

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("show"), 3500);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderMemoryCard(memory) {
  const card = document.createElement("article");
  card.className = `memory-card${memory.photoUrl ? " with-image" : ""}`;
  card.style.setProperty("--tilt", memory.tilt || "0deg");
  const image = memory.photoUrl
    ? `<img src="${escapeHtml(memory.photoUrl)}" alt="Zdjęcie z degustacji przesłane przez ${escapeHtml(memory.author)}" loading="lazy" />`
    : "";
  card.innerHTML = `${image}<div class="memory-copy"><p>\u201e${escapeHtml(memory.text)}"</p><footer><span>${escapeHtml(memory.author)}</span><span>✦</span></footer></div>`;
  return card;
}

function getLocalMemories() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  } catch {
    return [];
  }
}

function saveLocalMemory(memory) {
  const memories = getLocalMemories();
  memories.unshift(memory);
  localStorage.setItem(storageKey, JSON.stringify(memories.slice(0, 20)));
}

function renderMemories(memories) {
  const grid = document.querySelector("#memory-grid");
  grid.replaceChildren();
  const allMemories = memories.length ? memories : demoMemories;
  allMemories.forEach(memory => grid.append(renderMemoryCard(memory)));
}

async function getPublicMemories() {
  if (!supabaseClient) {
    renderMemories([...getLocalMemories(), ...demoMemories]);
    return;
  }

  const { data, error } = await supabaseClient
    .from("memories")
    .select("author, message, photo_path, created_at")
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .limit(24);

  if (error) {
    console.error(error);
    renderMemories(demoMemories);
    return;
  }

  const memories = data.map((memory, index) => ({
    author: memory.author,
    text: memory.message,
    photoUrl: memory.photo_path
      ? supabaseClient.storage.from("lucky-wheat-photos").getPublicUrl(memory.photo_path).data.publicUrl
      : "",
    tilt: `${[-1, 1.1, -.6, .7][index % 4]}deg`
  }));
  renderMemories([...memories, ...demoMemories]);
}

async function ensureAnonymousSession() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (session) return session;
  const { data, error } = await supabaseClient.auth.signInAnonymously();
  if (error) throw error;
  return data.session;
}

function resetPhotoInput() {
  selectedPhoto = null;
  const form = document.querySelector("#memory-form");
  form.elements.photo.value = "";
  const preview = document.querySelector("#photo-preview");
  preview.hidden = true;
  preview.querySelector("img").removeAttribute("src");
}

function setupCommunityWall() {
  const form = document.querySelector("#memory-form");
  if (!form) return;

  const photoInput = form.elements.photo;
  const preview = document.querySelector("#photo-preview");
  if (!photoInput || !preview) return;

  photoInput.addEventListener("change", () => {
    const [photo] = photoInput.files;
    if (!photo) return;
    if (photo.size > 5 * 1024 * 1024) {
      showToast("Zdjęcie jest za duże — maksymalny rozmiar to 5 MB.");
      resetPhotoInput();
      return;
    }
    selectedPhoto = photo;
    const image = preview.querySelector("img");
    image.src = URL.createObjectURL(photo);
    preview.hidden = false;
  });

  preview.querySelector("button").addEventListener("click", resetPhotoInput);

  form.addEventListener("submit", async event => {
    event.preventDefault();
    const formData = new FormData(form);
    const author = formData.get("author")?.trim();
    const message = formData.get("message")?.trim();
    if (!author || !message) {
      showToast("Uzupełnij wszystkie wymagane pola.");
      return;
    }
    const submit = form.querySelector("[type=submit]");
    submit.disabled = true;
    submit.textContent = "Chwilka…";

    try {
      if (!supabaseClient) {
        const photoUrl = selectedPhoto ? URL.createObjectURL(selectedPhoto) : "";
        saveLocalMemory({ author, text: message, photoUrl, tilt: "-1.1deg" });
        renderMemories([...getLocalMemories(), ...demoMemories]);
        showToast("Dodano wpis lokalnie!");
      } else {
        const session = await ensureAnonymousSession();
        let photoPath = null;
        if (selectedPhoto) {
          const extension = selectedPhoto.name.split(".").pop().toLowerCase();
          photoPath = `${session.user.id}/${crypto.randomUUID()}.${extension}`;
          const { error: uploadError } = await supabaseClient.storage
            .from("lucky-wheat-photos")
            .upload(photoPath, selectedPhoto, { contentType: selectedPhoto.type, upsert: false });
          if (uploadError) throw uploadError;
        }
        const { error: insertError } = await supabaseClient
          .from("memories")
          .insert({ user_id: session.user.id, author, message, photo_path: photoPath, approved: false });
        if (insertError) throw insertError;
        showToast("Dzięki! Wpis czeka na akceptację.");
      }
      form.reset();
      resetPhotoInput();
    } catch (error) {
      console.error("Błąd formularza:", error);
      showToast("Nie udało się wysłać wpisu.");
    } finally {
      submit.disabled = false;
      submit.innerHTML = 'Wyślij do ściany wspomnień <span>↗</span>';
    }
  });

  getPublicMemories();
}

function setupScrollReveal() {
  const targets = document.querySelectorAll("[data-animate]");
  if (!("IntersectionObserver" in window)) {
    targets.forEach(el => el.classList.add("revealed"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  targets.forEach(el => observer.observe(el));
}

function setupInteractions() {
  // Label dialog
  document.querySelectorAll("[data-open-label]").forEach(button => {
    button.addEventListener("click", () => document.querySelector("#label-dialog").showModal());
  });
  document.querySelector(".dialog-close").addEventListener("click", () =>
    document.querySelector("#label-dialog").close());
  document.querySelector("#label-dialog").addEventListener("click", event => {
    if (event.target.id === "label-dialog") event.currentTarget.close();
  });

  // Bottle number lookup — 40 specific facts
  const bottleInput = document.querySelector("#bottle-number");
  const bottleMessage = document.querySelector("#bottle-message");
  const bottleCard = document.querySelector(".bottle-card");

  document.querySelector("#unlock-bottle").addEventListener("click", () => {
    const bottleNumber = Number(bottleInput.value);
    if (!Number.isInteger(bottleNumber) || bottleNumber < 1 || bottleNumber > 40) {
      bottleMessage.textContent = "Wpisz numer od 1 do 40 — dokładnie tyle powstało butelek.";
      bottleInput.focus();
      return;
    }
    bottleMessage.textContent = bottleFacts[bottleNumber - 1];
    // Shake animation
    bottleCard.classList.remove("shaking");
    void bottleCard.offsetWidth; // reflow to restart
    bottleCard.classList.add("shaking");
    bottleCard.addEventListener("animationend", () => bottleCard.classList.remove("shaking"), { once: true });
  });

  // Allow Enter key in bottle input
  bottleInput.addEventListener("keydown", e => {
    if (e.key === "Enter") document.querySelector("#unlock-bottle").click();
  });

  // Ingredient cards
  const ingredientDetail = document.querySelector("#ingredient-detail");
  document.querySelectorAll("[data-ingredient]").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll("[data-ingredient]").forEach(item => item.classList.remove("active"));
      card.classList.add("active");
      const description = ingredientDescriptions[card.dataset.ingredient];
      ingredientDetail.innerHTML = `<span class="detail-label">${description.label}</span><p>${description.text}</p>`;
    });
  });

  // Temperature slider
  const temperature = document.querySelector("#temperature");
  const temperatureValue = document.querySelector("#temperature-value");
  const temperatureNote = document.querySelector("#temperature-note");
  const thermometerFill = document.querySelector("#thermometer-fill");
  const temperatureNotes = {
    4: "Bardzo chłodno — orzeźwia mocno, ale aromaty chwilę się chowają.",
    5: "Chłodno i chrupko. Dobra opcja na gorący dzień.",
    6: "Świetnie. Pszenica i cytrusy zaczynają grać razem.",
    7: "Idealnie. Cytrusy są wyraźne, a piwo pozostaje rześkie.",
    8: "Górna granica ideału: kolendra pokaże się odrobinę wyraźniej.",
    9: "Już dość ciepło — aromat rośnie, ale rześkość odpuszcza.",
    10: "Czas dorzucić trochę chłodu. Lucky Wheat najbardziej lubi 6–8°C."
  };

  function updateTemperature() {
    const value = Number(temperature.value);
    temperatureValue.textContent = `${value}°C`;
    temperatureNote.textContent = temperatureNotes[value];
    thermometerFill.style.height = `${Math.max(22, ((value - 4) / 6) * 100)}%`;
  }
  temperature.addEventListener("input", updateTemperature);
  updateTemperature();

  // Mood buttons
  document.querySelectorAll("[data-mood]").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-mood]").forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      document.querySelector("#mood-answer").innerHTML =
        `<span>✦</span><p>${moodDescriptions[button.dataset.mood]}</p>`;
    });
  });

  // Share button
  const shareButton = document.querySelector("#share-button");
  if (shareButton) {
    shareButton.addEventListener("click", async () => {
      const shareData = {
        title: "Lucky Wheat — Witbier od Klimasa",
        text: "Zobacz historię limitowanej warki Lucky Wheat.",
        url: window.location.href
      };
      try {
        if (navigator.share) {
          await navigator.share(shareData);
        } else {
          await navigator.clipboard.writeText(window.location.href);
          showToast("Link skopiowany. Podeślij go swojej ekipie!");
        }
      } catch (error) {
        if (error.name !== "AbortError") showToast("Nie udało się udostępnić linku.");
      }
    });
  }
}

setupScrollReveal();
setupInteractions();
setupCommunityWall();
