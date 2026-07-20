# Lucky Wheat — strona warki

Jednostronicowa witryna dla domowego witbiera Lucky Wheat od Klimasa. Jest gotowa do opublikowania bez domeny, np. na GitHub Pages.

## Uruchomienie lokalne

Otwórz `index.html` w przeglądarce albo uruchom w katalogu projektu:

```sh
python3 -m http.server 8080
```

Następnie odwiedź `http://localhost:8080`.

## Publiczna ściana wspomnień

Bez konfiguracji ściana działa demonstracyjnie: wpisy zapisują się tylko w przeglądarce osoby, która je dodała. Aby komentarze i zdjęcia były widoczne dla wszystkich:

1. Załóż bezpłatny projekt w [Supabase](https://supabase.com/).
2. W `SQL Editor` wklej i uruchom [supabase/schema.sql](supabase/schema.sql).
3. W `Authentication → Providers` włącz `Anonymous sign-ins`.
4. Skopiuj `Project URL` i klucz `anon public` z `Project Settings → API` do `config.js`.
5. W `Table Editor → memories` zatwierdzaj wartości `approved` dla wpisów, które mają trafić na stronę.

Do `config.js` wolno wpisać wyłącznie publiczny klucz `anon`; nigdy nie wpisuj tam klucza `service_role`.

## Publikacja na GitHub Pages

1. Załóż konto na GitHub i utwórz publiczne repozytorium, np. `lucky-wheat`.
2. Prześlij zawartość tego folderu do repozytorium.
3. Wejdź w `Settings → Pages`, wybierz `Deploy from a branch`, branch `main` i folder `/ (root)`.
4. Po chwili strona będzie dostępna pod adresem `https://twoj-login.github.io/lucky-wheat/`.
5. Dopiero ten ostateczny adres zamień w kod QR na etykietę.

## Dane receptury

Strona wykorzystuje informacje z zestawu Browamator „BA Prawdziwy WITBIER 12,0°”: 20 l warki, ekstrakty pszeniczny i jasny, chmiele Saaz i Palisade, drożdże SafAle S-33, skórkę Curacao i kolendrę. Parametry na stronie dopasowano do etykiety Lucky Wheat: 4,8% obj., 12°Blg i 15 IBU.
