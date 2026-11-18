<script setup lang="ts">
// All data arrives through props: the component itself holds no student data.
const props = withDefaults(
  defineProps<{
    name: string
    studentId: string
    course: string
    yearLevel: string
    email: string
    section?: string
    status?: 'Enrolled' | 'Not Enrolled' | 'On Leave'
    standing?: string
    units?: number
    maxUnits?: number
    avatar?: string // image path/URL or an emoji
    fallback?: string // emoji shown if the image can't load
    accent?: string // title-bar color
  }>(),
  {
    section: '',
    status: 'Enrolled',
    standing: '',
    units: 0,
    maxUnits: 24,
    avatar: '👾',
    fallback: '👾',
    accent: '',
  },
)

const titleStyle = computed(() => (props.accent ? { background: props.accent } : {}))

// Treat the avatar as an image if it looks like a file path or URL.
const looksLikeImage = computed(() => /^(\/|https?:)|\.(png|jpe?g|gif|webp|svg)$/i.test(props.avatar))
const imageFailed = ref(false)
const showImage = computed(() => looksLikeImage.value && !imageFailed.value)
const emoji = computed(() => (looksLikeImage.value ? props.fallback : props.avatar))

const enrolled = computed(() => props.status === 'Enrolled')
const badgeClass = computed(() =>
  props.status === 'Enrolled' ? 'badge--enrolled' : props.status === 'On Leave' ? 'badge--on-leave' : 'badge--not-enrolled',
)
const loadPercent = computed(() => Math.min(100, Math.round((props.units / props.maxUnits) * 100)))
</script>

<template>
  <article class="student-card win" :class="{ 'student-card--inactive': !enrolled }">
    <div class="win-title" :style="titleStyle">
      <span>💾 {{ studentId }}.exe</span>
      <span class="win-controls" aria-hidden="true"><span>_</span><span>×</span></span>
    </div>

    <div class="win-body">
      <div class="student-card__avatar sunken">
        <img v-if="showImage" :src="avatar" :alt="`Photo of ${name}`" class="student-card__img" @error="imageFailed = true">
        <span v-else aria-hidden="true">{{ emoji }}</span>
      </div>

      <h3 class="student-card__name">{{ name }}</h3>
      <p class="student-card__badge"><span class="badge" :class="badgeClass">● {{ status }}</span></p>

      <dl class="student-card__details">
        <dt>Course</dt>
        <dd>{{ course }}</dd>
        <dt>Year</dt>
        <dd>{{ yearLevel }}<template v-if="section"> · {{ section }}</template></dd>
        <dt>Standing</dt>
        <dd :class="{ 'is-star': standing === `Dean's Lister` }">
          <template v-if="enrolled">{{ standing === `Dean's Lister` ? '★ ' : '' }}{{ standing }}</template>
          <template v-else>{{ standing || 'N/A' }}</template>
        </dd>
      </dl>

      <div class="student-card__load" :title="`${units} of ${maxUnits} units`">
        <span class="student-card__load-label">Unit load</span>
        <div class="student-card__bar sunken" role="progressbar" :aria-valuenow="units" :aria-valuemax="maxUnits">
          <div class="student-card__fill" :style="{ width: loadPercent + '%' }" />
        </div>
        <span class="student-card__load-num">{{ units }}/{{ maxUnits }}</span>
      </div>

      <a class="student-card__email" :href="`mailto:${email}`">✉ {{ email }}</a>
    </div>
  </article>
</template>

<style scoped>
.student-card--inactive .student-card__avatar {
  filter: grayscale(1);
  opacity: 0.8;
}

.student-card__avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 84px;
  height: 84px;
  margin: 0 auto 10px;
  font-size: 46px;
  background: #fffbe0;
  overflow: hidden;
}

.student-card__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.student-card__name {
  margin-bottom: 4px;
  text-align: center;
  font-size: 20px;
  color: var(--navy);
}

.student-card__badge {
  margin: 0 0 8px;
  text-align: center;
}

.student-card__details {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2px 10px;
  margin: 0 0 10px;
  padding: 8px;
  font-family: var(--font-mono);
  font-size: 13px;
  background: #fff;
  border: 2px solid;
  border-color: var(--shadow) var(--white) var(--white) var(--shadow);
}

.student-card__details dt {
  font-weight: bold;
}

.student-card__details dd {
  margin: 0;
}

.student-card__details .is-star {
  font-weight: bold;
  color: #b8860b;
}

.student-card__load {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 6px;
  align-items: center;
  margin-bottom: 10px;
  font-size: 12px;
}

.student-card__bar {
  height: 14px;
  padding: 1px;
  background: #fff;
}

.student-card__fill {
  height: 100%;
  background: repeating-linear-gradient(90deg, #000080 0 8px, transparent 8px 10px);
}

.student-card__load-num {
  font-family: var(--font-mono);
}

.student-card__email {
  display: block;
  overflow-wrap: anywhere;
  text-align: center;
  font-size: 13px;
}
</style>