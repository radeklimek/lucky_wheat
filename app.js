const ingredientDescriptions = {
  wheat: {
    label: "SŁÓD:",
    text: "„Nadaje piwu lekką pełnię, jasną barwę oraz delikatny, zbożowy charakter z subtelną nutą chleba i świeżego pieczywa.”"
  },
  orange: {
    label: "CURACAO:",
    text: "Dodaje świeży, cytrusowy aromat oraz lekką owocową słodycz, będącą znakiem rozpoznawczym stylu Witbier.”"
  },
  coriander: {
    label: "KOLENDRA:",
    text: "Wzbogaca piwo o subtelne, korzenne nuty z cytrusowym akcentem, nadając mu charakterystyczny belgijski profil.”"
  },
  hops: {
    label: "CHMIELE SAAZ + PALISADE:",
    text: "Wnosi łagodną goryczkę oraz delikatny, ziołowo-kwiatowy aromat, który podkreśla orzeźwiający charakter piwa.”"
  }
};

const flavourDescriptions = {
  citrus: { title: "Cytrus", text: "Skórka Curacao daje rześki, lekko gorzki finisz." },
  spice: { title: "Kolendra", text: "W tle pojawia się świeży, lekko pieprzny akcent z cytrusową iskrą." },
  wheat: { title: "Pszenica", text: "Miękka, chlebowa baza i naturalna mgiełka typowa dla witbiera." },
  bitter: { title: "Goryczka", text: "15 IBU to dyskretna kontrapunktowa nuta, która prosi o kolejny łyk." }
};

const moodDescriptions = {
  weekend: "Weekend oficjalnie odblokowany. Schłodź do 7°C, nalej powoli i zostaw trochę miejsca na pyszną pianę.",
  friends: "Najlepiej smakuje w środku rozmowy. Wstaw butelki do wiaderka z lodem i daj ludziom opowiadać historie.",
  quiet: "Wersja spokojna: jeden ulubiony kufel, 7°C i czas na wychwycenie kolendry w drugim łyku."
};

const bottleMessages = [
  "Butelka #{number} — liczba szczęśliwa dziś wyjątkowo dobrze.",
  "#{number}/40. Ta butelka wybrała właściwy wieczór.",
  "Butelka #{number}: oficjalnie część historii tej warki.",
  "#{number} — nie potrząsaj. Mętność jest tu częścią planu.",
  "Butelka #{number}: otwieraj w towarzystwie lub z bardzo dobrym planem na wieczór."
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
  const image = memory.photoUrl ? `<img src="${escapeHtml(memory.photoUrl)}" alt="Zdjęcie z degustacji przesłane przez ${escapeHtml(memory.author)}" loading="lazy" />` : "";
  card.innerHTML = `${image}<div class="memory-copy"><p>„${escapeHtml(memory.text)}”</p><footer><span>${escapeHtml(memory.author)}</span><span>✦</span></footer></div>`;
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
    photoUrl: memory.photo_path ? supabaseClient.storage.from("lucky-wheat-photos").getPublicUrl(memory.photo_path).data.publicUrl : "",
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

  if (!form) {
    console.error("Nie znaleziono formularza #memory-form");
    return;
  }

  const photoInput = form.elements.photo;
  const preview = document.querySelector("#photo-preview");

  if (!photoInput || !preview) {
    console.error("Brak pola zdjęcia albo podglądu");
    return;
  }

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


  preview.querySelector("button")
    .addEventListener("click", resetPhotoInput);


  form.addEventListener("submit", async event => {
    event.preventDefault();

    console.log("FORMULARZ DZIAŁA");

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

        const photoUrl = selectedPhoto
          ? URL.createObjectURL(selectedPhoto)
          : "";


        saveLocalMemory({
          author,
          text: message,
          photoUrl,
          tilt: "-1.1deg"
        });


        renderMemories([
          ...getLocalMemories(),
          ...demoMemories
        ]);


        showToast("Dodano wpis lokalnie!");

      } else {


        const session = await ensureAnonymousSession();

        let photoPath = null;


        if (selectedPhoto) {

          const extension =
            selectedPhoto.name
              .split(".")
              .pop()
              .toLowerCase();


          photoPath =
            `${session.user.id}/${crypto.randomUUID()}.${extension}`;


          const { error: uploadError } =
            await supabaseClient.storage
              .from("lucky-wheat-photos")
              .upload(
                photoPath,
                selectedPhoto,
                {
                  contentType: selectedPhoto.type,
                  upsert: false
                }
              );


          if (uploadError) {
            throw uploadError;
          }

        }


        const { error: insertError } =
          await supabaseClient
            .from("memories")
            .insert({
              user_id: session.user.id,
              author,
              message,
              photo_path: photoPath,
              approved: false
            });


        if (insertError) {
          throw insertError;
        }


        showToast(
          "Dzięki! Wpis czeka na akceptację."
        );

      }


      form.reset();
      resetPhotoInput();


    } catch (error) {

      console.error("Błąd formularza:", error);

      showToast(
        "Nie udało się wysłać wpisu."
      );

    } finally {

      submit.disabled = false;

      submit.innerHTML =
        'Wyślij do ściany <span>↗</span>';

    }

  });


  getPublicMemories();
}

function setupInteractions() {
  document.querySelectorAll("[data-open-label]").forEach(button => {
    button.addEventListener("click", () => document.querySelector("#label-dialog").showModal());
  });
  document.querySelector(".dialog-close").addEventListener("click", () => document.querySelector("#label-dialog").close());
  document.querySelector("#label-dialog").addEventListener("click", event => {
    if (event.target.id === "label-dialog") event.currentTarget.close();
  });

  const bottleInput = document.querySelector("#bottle-number");
  const bottleMessage = document.querySelector("#bottle-message");
  document.querySelector("#unlock-bottle").addEventListener("click", () => {
    const bottleNumber = Number(bottleInput.value);
    if (!Number.isInteger(bottleNumber) || bottleNumber < 1 || bottleNumber > 40) {
      bottleMessage.textContent = "Wpisz numer od 1 do 40 — dokładnie tyle powstało butelek.";
      bottleInput.focus();
      return;
    }
    const template = bottleMessages[bottleNumber % bottleMessages.length];
    bottleMessage.textContent = template.replace("{number}", String(bottleNumber).padStart(2, "0"));
    document.querySelector(".bottle-card").animate([{ transform: "rotate(-1deg)" }, { transform: "rotate(1deg)" }, { transform: "rotate(-1deg)" }], { duration: 420 });
  });

  const ingredientDetail = document.querySelector("#ingredient-detail");
  document.querySelectorAll("[data-ingredient]").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll("[data-ingredient]").forEach(item => item.classList.remove("active"));
      card.classList.add("active");
      const description = ingredientDescriptions[card.dataset.ingredient];
      ingredientDetail.innerHTML = `<span class="detail-label">${description.label}</span><p>${description.text}</p>`;
    });
  });

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

  document.querySelectorAll("[data-mood]").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-mood]").forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      document.querySelector("#mood-answer").innerHTML = `<span>✦</span><p>${moodDescriptions[button.dataset.mood]}</p>`;
    });
  });

  document.querySelectorAll("[data-flavour]").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-flavour]").forEach(item => item.classList.remove("selected"));
      button.classList.add("selected");
      const flavour = flavourDescriptions[button.dataset.flavour];
      document.querySelector("#flavour-output").innerHTML = `<b>${flavour.title}</b><span>${flavour.text}</span>`;
    });
  });

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
        if (error.name !== "AbortError") {
          showToast("Nie udało się udostępnić linku.");
        }
      }
    });
  }
}


setupInteractions();
setupCommunityWall();
