<script setup lang="ts">
useHead({ title: 'Home - Student Info Portal' })

const students = useState<any[]>('students', () => [])
const total = computed(() => students.value.length)
const enrolledCount = computed(() => students.value.filter((s) => s.status === 'Enrolled').length)
const deansListers = computed(() => students.value.filter((s) => s.standing === "Dean's Lister").length)

// ---- personal welcome ----
const visitor = useState('visitor-name', () => '')
const draft = ref('')
const hour = ref<number | null>(null)
const today = ref('')

onMounted(() => {
  const now = new Date()
  hour.value = now.getHours()
  today.value = now.toLocaleDateString('en-PH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  try {
    const saved = localStorage.getItem('portal-visitor')
    if (saved) visitor.value = saved
  } catch {
    /* storage can be blocked: the page still works */
  }
})

const greeting = computed(() => {
  if (hour.value === null) return 'Welcome'
  if (hour.value < 12) return 'Good morning'
  if (hour.value < 18) return 'Good afternoon'
  return 'Good evening'
})

function signIn() {
  const name = draft.value.trim()
  if (!name) return
  visitor.value = name
  try {
    localStorage.setItem('portal-visitor', name)
  } catch {
    /* ignore */
  }
}

function signOut() {
  visitor.value = ''
  draft.value = ''
  try {
    localStorage.removeItem('portal-visitor')
  } catch {
    /* ignore */
  }
}

// ---- bulletin board ----
const news = [
  { tag: 'NEW', text: 'Enrollment for the 1st Semester is now open. Check your status on the Students page.' },
  { tag: 'HOT', text: "Dean's List announcements are out. Congratulations to our top students!" },
  { tag: 'INFO', text: 'Students marked NOT ENROLLED: please submit your pending requirements to the registrar.' },
  { tag: 'FUN', text: 'Sign our guestbook below. Every visitor makes the counter go up!' },
]
</script>

<template>
  <div class="stack">
    <!-- WELCOME WINDOW -->
    <section class="win home-welcome">
      <div class="win-title"><span>🏠 Welcome.exe</span></div>
      <div class="win-body home-welcome__body">
        <div class="home-welcome__text">
          <p class="home-welcome__hello">
            {{ greeting }}<template v-if="visitor">, <b>{{ visitor }}</b></template>!
          </p>
          <h2 class="home-welcome__title">Welcome to the Student Info Portal</h2>
          <p>
            Your one-stop page for finding classmates, checking who is enrolled, and seeing
            academic standing, all in good old 1998 style.
          </p>
          <p v-if="today" class="home-welcome__date">📅 Today is {{ today }}</p>
        </div>

        <!-- sign-in box -->
        <div class="home-signin sunken">
          <template v-if="!visitor">
            <p class="home-signin__label"><b>Who's visiting?</b></p>
            <form class="home-signin__form" @submit.prevent="signIn">
              <input v-model="draft" type="text" maxlength="24" placeholder="Type your name..." aria-label="Your name">
              <AppButton label="Enter" type="submit" color="#66dd66" />
            </form>
            <p class="home-signin__hint">No password needed. It's the 90s!</p>
          </template>
          <template v-else>
            <p class="home-signin__label">✔ Signed in as <b>{{ visitor }}</b></p>
            <p class="home-signin__hint">Enjoy browsing the directory.</p>
            <AppButton label="Sign out" color="#ff9999" @click="signOut" />
          </template>
        </div>
      </div>
    </section>

    <!-- QUICK STATS -->
    <section class="home-stats">
      <div class="home-stat win">
        <div class="win-body">
          <span class="home-stat__num">{{ total }}</span>
          <span class="home-stat__label">Students listed</span>
        </div>
      </div>
      <div class="home-stat win">
        <div class="win-body">
          <span class="home-stat__num home-stat__num--green">{{ enrolledCount }}</span>
          <span class="home-stat__label">Currently enrolled</span>
        </div>
      </div>
      <div class="home-stat win">
        <div class="win-body">
          <span class="home-stat__num home-stat__num--gold">{{ deansListers }}</span>
          <span class="home-stat__label">★ Dean's Listers</span>
        </div>
      </div>
    </section>

    <!-- DESKTOP ICONS + BULLETIN -->
    <section class="home-columns">
      <div class="win">
        <div class="win-title"><span>🖥️ My Desktop</span></div>
        <div class="win-body home-icons">
          <NuxtLink to="/students" class="home-icon">
            <span class="home-icon__pic">🎓</span>
            <span class="home-icon__name">Student Directory</span>
          </NuxtLink>
          <NuxtLink to="/about" class="home-icon">
            <span class="home-icon__pic">📖</span>
            <span class="home-icon__name">About the Portal</span>
          </NuxtLink>
          <a class="home-icon" href="mailto:registrar@example.edu">
            <span class="home-icon__pic">📬</span>
            <span class="home-icon__name">Email Registrar</span>
          </a>
          <NuxtLink to="/students" class="home-icon">
            <span class="home-icon__pic">✅</span>
            <span class="home-icon__name">Check Enrollment</span>
          </NuxtLink>
        </div>
      </div>

      <InfoCard title="📌 Bulletin Board" description="Latest announcements for students">
        <ul class="home-news">
          <li v-for="item in news" :key="item.text">
            <span class="home-news__tag" :class="`home-news__tag--${item.tag.toLowerCase()}`">{{ item.tag }}</span>
            {{ item.text }}
          </li>
        </ul>
      </InfoCard>
    </section>
  </div>
</template>

<style scoped>
.home-welcome__body {
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr minmax(220px, 280px);
  align-items: start;
}

@media (max-width: 720px) {
  .home-welcome__body {
    grid-template-columns: 1fr;
  }
}

.home-welcome__hello {
  margin: 0;
  font-family: var(--font-head);
  font-size: 20px;
  color: #cc0066;
}

.home-welcome__title {
  font-size: 30px;
  line-height: 1.15;
  color: var(--navy);
  text-shadow: 2px 2px 0 #fff;
}

.home-welcome__date {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 13px;
}

.home-signin {
  padding: 12px;
  text-align: center;
}

.home-signin__label {
  margin-bottom: 8px;
}

.home-signin__form {
  display: flex;
  gap: 6px;
  justify-content: center;
}

.home-signin input {
  flex: 1;
  min-width: 0;
  padding: 4px 6px;
  font-family: var(--font-mono);
  font-size: 14px;
  background: #fff;
  border: 2px solid;
  border-color: var(--shadow) var(--white) var(--white) var(--shadow);
}

.home-signin__hint {
  margin: 8px 0 0;
  font-size: 12px;
  color: #444;
}

/* stats */
.home-stats {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.home-stat .win-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.home-stat__num {
  min-width: 80px;
  padding: 0 14px;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 40px;
  line-height: 1.2;
  color: #00ff00;
  background: #000;
  border: 2px solid;
  border-color: var(--shadow) var(--white) var(--white) var(--shadow);
}

.home-stat__num--green {
  color: #66ff99;
}

.home-stat__num--gold {
  color: #ffd700;
}

.home-stat__label {
  font-weight: bold;
}

/* desktop + bulletin */
.home-columns {
  display: grid;
  gap: 16px;
  grid-template-columns: minmax(240px, 1fr) minmax(280px, 1.4fr);
  align-items: start;
}

@media (max-width: 720px) {
  .home-columns {
    grid-template-columns: 1fr;
  }
}

.home-icons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  background: var(--teal);
}

.home-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 4px;
  text-align: center;
  text-decoration: none;
  color: #fff;
}

.home-icon:visited {
  color: #fff;
}

.home-icon:hover .home-icon__name,
.home-icon:focus-visible .home-icon__name {
  background: var(--navy);
  outline: 1px dotted #fff;
}

.home-icon__pic {
  font-size: 38px;
  line-height: 1;
}

.home-icon__name {
  padding: 0 4px;
  font-size: 12px;
}

.home-news {
  margin: 0;
  padding: 0;
  list-style: none;
}

.home-news li {
  padding: 6px 0;
  border-bottom: 1px dashed #808080;
}

.home-news li:last-child {
  border-bottom: 0;
}

.home-news__tag {
  display: inline-block;
  min-width: 42px;
  margin-right: 4px;
  padding: 0 4px;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: bold;
  color: #fff;
  background: #000080;
}

.home-news__tag--new {
  background: #cc0000;
}

.home-news__tag--hot {
  background: #e06000;
}

.home-news__tag--fun {
  background: #800080;
}
</style>