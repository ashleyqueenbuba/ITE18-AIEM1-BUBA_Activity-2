# Student Info Portal (Retro Edition)

A small Nuxt 4 + Vue 3 site that shows how **reusable components** and **props** replace copy-pasted HTML. Styled as a late-90s web page.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Other commands: `npm run build`, `npm run generate` (static export), `npm run preview`.

## Structure

```
app/
  app.vue                  <- header + <NuxtPage/> + footer (shared by every page)
  assets/css/retro.css     <- retro theme: colors, bevels, window look
  components/
    AppHeader.vue          <- website navigation
    AppFooter.vue          <- website footer
    StudentCard.vue        <- student info, driven by props
    InfoCard.vue           <- title + description
    AppButton.vue          <- reusable button (label / color / textColor / to / href)
  pages/
    index.vue              <- Home
    students.vue           <- 4 StudentCards from an array
    about.vue              <- InfoCards + AppButton color demo
```

Nuxt auto-imports everything in `app/components/`, so no `import` lines are needed.

## Props at a glance

| Component     | Props |
|---------------|-------|
| `StudentCard` | `name`, `studentId`, `course`, `yearLevel`, `email`, `avatar?`, `accent?` |
| `InfoCard`    | `title`, `description` (+ optional default slot) |
| `AppButton`   | `label`, `color?`, `textColor?`, `to?` (internal link), `href?` (external), `type?` |

```vue
<StudentCard
  name="Maria Santos"
  student-id="2026-0001"
  course="BS Computer Science"
  year-level="3rd Year"
  email="maria.santos@example.edu"
/>

<AppButton label="Go!" color="#ff6666" to="/students" />
```
