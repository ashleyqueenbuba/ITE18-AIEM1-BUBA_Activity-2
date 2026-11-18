<script setup lang="ts">
useHead({ title: 'About - Student Info Portal' })

const students = useState<any[]>('students', () => [])
const total = computed(() => students.value.length)
const enrolledCount = computed(() => students.value.filter((s) => s.status === 'Enrolled').length)
const notEnrolledCount = computed(() => total.value - enrolledCount.value)
const deansListers = computed(() => students.value.filter((s) => s.standing === "Dean's Lister").length)

function badgeClass(status: string) {
  return status === 'Enrolled' ? 'badge--enrolled' : status === 'On Leave' ? 'badge--on-leave' : 'badge--not-enrolled'
}

const features = [
  { icon: '🔎', title: 'Find classmates', text: 'Look up any student by name, course, year level and section.' },
  { icon: '✅', title: 'Check enrollment', text: 'See at a glance who is enrolled this semester and who still has requirements to pass.' },
  { icon: '🏅', title: 'See standing', text: "Academic standing is shown for enrolled students, from Good Standing to Dean's Lister." },
  { icon: '✉️', title: 'Get in touch', text: 'Every card has an email link so you can reach out right away.' },
]

const standings = [
  { label: "★ Dean's Lister", text: 'Excellent grades last term. Top of the class!' },
  { label: 'Good Standing', text: 'Passing all subjects and on track to graduate.' },
  { label: 'Pending requirements', text: 'Not yet enrolled. Documents or fees are still needed.' },
]

const faqs = [
  { q: 'Who can see this portal?', a: 'Everyone in the class. It is a simple directory made for students, by students.' },
  { q: 'How often is the information updated?', a: 'At the start of every semester, after enrollment closes.' },
  { q: 'My details are wrong. What do I do?', a: 'Email the registrar and ask for a correction. Include your student ID.' },
]
</script>

<template>
  <div class="stack">
    <!-- ABOUT THE PORTAL -->
    <section class="win">
      <div class="win-title"><span>📖 AboutThePortal.txt</span></div>
      <div class="win-body about-hero">
        <div class="about-hero__logo sunken" aria-hidden="true">🎓</div>
        <div>
          <h2>About the Student Info Portal</h2>
          <p>
            The Student Info Portal is our class's home on the web. It puts everyone's details in one
            friendly place, so finding a classmate, checking enrollment or looking up academic standing
            takes seconds instead of a trip to the registrar.
          </p>
          <p>
            It is made for the students and kept up by the students, with a lot of love for the
            old-school internet.
          </p>
        </div>
      </div>
    </section>

    <!-- WHAT YOU CAN DO -->
    <section class="grid">
      <InfoCard v-for="f in features" :key="f.title" :title="`${f.icon} ${f.title}`" :description="f.text" />
    </section>

    <!-- ABOUT THE STUDENTS -->
    <section class="about-students">
      <div class="win">
        <div class="win-title"><span>👥 Our Students</span></div>
        <div class="win-body">
          <p>
            Right now the portal lists <b>{{ total }} students</b> from different courses, bringing
            together computing, information systems and the creative arts.
          </p>

          <div class="about-numbers">
            <div class="sunken"><b>{{ enrolledCount }}</b><span>Enrolled</span></div>
            <div class="sunken"><b>{{ notEnrolledCount }}</b><span>Not enrolled</span></div>
            <div class="sunken"><b>{{ deansListers }}</b><span>Dean's Lister</span></div>
          </div>

          <ul class="about-roster">
            <li v-for="s in students" :key="s.studentId">
              <span class="about-roster__name">{{ s.name }}</span>
              <span class="about-roster__course">{{ s.course }}, {{ s.yearLevel }}</span>
              <span class="badge" :class="badgeClass(s.status)">● {{ s.status }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="win">
        <div class="win-title"><span>🏅 Reading a Student's Standing</span></div>
        <div class="win-body">
          <dl class="about-legend">
            <template v-for="s in standings" :key="s.label">
              <dt>{{ s.label }}</dt>
              <dd>{{ s.text }}</dd>
            </template>
          </dl>
          <p class="about-legend__note">
            Status badges: <span class="badge badge--enrolled">● Enrolled</span>
            <span class="badge badge--on-leave">● On Leave</span>
            <span class="badge badge--not-enrolled">● Not Enrolled</span>
          </p>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="win">
      <div class="win-title"><span>❓ Frequently Asked Questions</span></div>
      <div class="win-body about-faq">
        <details v-for="f in faqs" :key="f.q" class="sunken">
          <summary>{{ f.q }}</summary>
          <p>{{ f.a }}</p>
        </details>
      </div>
    </section>

    <div class="center">
      <AppButton label="« Back to Home" to="/" color="#ffff66" />
      <AppButton label="Meet the Students »" to="/students" color="#99ddff" />
    </div>
  </div>
</template>

<style scoped>
.about-hero {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 16px;
  align-items: center;
}

@media (max-width: 600px) {
  .about-hero {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
  }
}

.about-hero__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 110px;
  font-size: 64px;
  background: #fffbe0;
}

.about-hero h2 {
  color: var(--navy);
  text-shadow: 2px 2px 0 #fff;
}

.about-students {
  display: grid;
  gap: 16px;
  grid-template-columns: 1.3fr 1fr;
  align-items: start;
}

@media (max-width: 760px) {
  .about-students {
    grid-template-columns: 1fr;
  }
}

.about-numbers {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin: 10px 0;
  text-align: center;
}

.about-numbers div {
  display: flex;
  flex-direction: column;
  padding: 6px 2px;
}

.about-numbers b {
  font-family: var(--font-mono);
  font-size: 26px;
  color: var(--navy);
}

.about-numbers span {
  font-size: 12px;
}

.about-roster {
  margin: 0;
  padding: 0;
  list-style: none;
}

.about-roster li {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2px 8px;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px dashed #808080;
}

.about-roster li:last-child {
  border-bottom: 0;
}

.about-roster__name {
  font-weight: bold;
}

.about-roster__course {
  grid-column: 1;
  font-size: 12px;
}

.about-roster li > :last-child {
  grid-column: 2;
  grid-row: 1 / span 2;
}

.about-legend {
  margin: 0;
}

.about-legend dt {
  margin-top: 8px;
  font-weight: bold;
  color: var(--navy);
}

.about-legend dd {
  margin: 0;
}

.about-legend__note {
  margin: 12px 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

.about-faq {
  display: grid;
  gap: 8px;
}

.about-faq details {
  padding: 6px 10px;
}

.about-faq summary {
  cursor: pointer;
  font-weight: bold;
}

.about-faq details p {
  margin: 6px 0 0;
}
</style>