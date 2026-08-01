# Lucky Wheat — strona warki

Jednostronicowa strona dla domowego witbiera **Lucky Wheat** od Klimasa (warka 01/2026, 40 butelek).

## Stack

- Czyste HTML + CSS + vanilla JavaScript (bez frameworków, bez buildu)
- Opcjonalna integracja z **Supabase** (ściana wspomnień: wpisy + zdjęcia)
- Google Fonts: Alegreya SC, DM Sans, Righteous

## Uruchamianie

```sh
python3 -m http.server 5000
```

Następnie odwiedź `http://localhost:5000` lub preview Replita.

## Pliki

| Plik | Opis |
|---|---|
| `index.html` | Cała struktura HTML |
| `styles.css` | Pełny arkusz stylów z responsive design i animacjami |
| `app.js` | Interaktywność: 40 ciekawostek, slider temperatury, ściana wspomnień |
| `config.js` | Klucze Supabase (url + anonKey) — wypełnij aby włączyć ścianę wspomnień |
| `assets/` | Grafiki: etykieta, postać, zdjęcia |
| `supabase/schema.sql` | SQL schema do skopiowania w Supabase SQL Editor |

## Konfiguracja Supabase (opcjonalna)

1. Załóż projekt na [supabase.com](https://supabase.com)
2. Uruchom `supabase/schema.sql` w SQL Editorze
3. Włącz Anonymous sign-ins w Authentication → Providers
4. Wklej `Project URL` i `anon key` do `config.js`
5. Zatwierdź wpisy w Table Editor → memories (kolumna `approved`)

## User preferences

- Strona powinna być zawsze poprawnie wyświetlana na telefonie i komputerze
- Czcionki muszą obsługiwać polskie znaki (ą, ę, ó, ś, ź, ż, ć, ń, ł)
- Link do Instagrama: @radeklimek → https://instagram.com/radeklimek
