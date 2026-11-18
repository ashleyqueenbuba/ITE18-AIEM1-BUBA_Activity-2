<script setup lang="ts">
useHead({ title: 'Students - Student Info Portal' })

const students = useState<any[]>('students', () => [])
const SEMESTER = '1st Semester, A.Y. 2026-2027'
const MAX_UNITS = 24
const total = computed(() => students.value.length)
const enrolledCount = computed(() => students.value.filter((s) => s.status === 'Enrolled').length)
const notEnrolledCount = computed(() => total.value - enrolledCount.value)

// Filter buttons: All / Enrolled / Not Enrolled
type Filter = 'all' | 'enrolled' | 'not-enrolled'
const filter = ref<Filter>('all')

const filters = computed(() => [
  { key: 'all' as Filter, label: `All (${total.value})`, color: '#ffff66' },
  { key: 'enrolled' as Filter, label: `✔ Enrolled (${enrolledCount.value})`, color: '#66dd66' },
  { key: 'not-enrolled' as Filter, label: `✖ Not Enrolled (${notEnrolledCount.value})`, color: '#ff8888' },
])

const visible = computed(() => {
  if (filter.value === 'enrolled') return students.value.filter((s) => s.status === 'Enrolled')
  if (filter.value === 'not-enrolled') return students.value.filter((s) => s.status !== 'Enrolled')
  return students.value
})
</script>

<template>
  <div class="stack">
    <section class="win">
      <div class="win-title"><span>📁 C:\Students\Directory</span></div>
      <div class="win-body">
        <h2>Student Directory</h2>
        <p>
          Showing <b>{{ visible.length }}</b> of {{ total }} student(s) for <b>{{ SEMESTER }}</b>.
          Each card shows the student's information, enrollment status and academic standing.
        </p>

        <div class="students-filters" role="group" aria-label="Filter students">
          <AppButton
            v-for="f in filters"
            :key="f.key"
            :label="f.label"
            :color="filter === f.key ? f.color : '#c0c0c0'"
            :class="{ 'students-filters__on': filter === f.key }"
            @click="filter = f.key"
          />
        </div>
      </div>
    </section>

    <section class="grid">
      <StudentCard v-for="student in visible" :key="student.studentId" v-bind="student" :max-units="MAX_UNITS" />
    </section>

    <p v-if="!visible.length" class="win win-body students-empty">No students match this filter.</p>

    <div class="center">
      <AppButton label="« Back to Home" to="/" color="#ffff66" />
      <AppButton label="About the Portal »" to="/about" color="#99ddff" />
    </div>
  </div>
</template>

<style scoped>
.students-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.students-filters__on {
  border-color: var(--shadow) var(--white) var(--white) var(--shadow) !important;
  box-shadow: none !important;
}

.students-empty {
  text-align: center;
  font-weight: bold;
}
</style>