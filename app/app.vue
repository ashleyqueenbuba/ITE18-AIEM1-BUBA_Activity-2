<script setup lang="ts">
// Shared student data: declared once here, read by Home, Students and About.
// Edit status / standing / units to change what the pages show.
useState('students', () => [
  {
    name: 'Jasmin Dagani',
    studentId: '2026-0001',
    course: 'BS Computer Science',
    yearLevel: '3rd Year',
    section: 'CS-3A',
    email: 'jasmindimagigiba@example.edu',
    status: 'Enrolled',
    standing: "Dean's Lister",
    units: 21,
    avatar: '/avatars/jasmin.png', // change to your own file name
    fallback: '👩',
    accent: '#800080',
  },
  {
    name: 'Yana Clado',
    studentId: '2026-0002',
    course: 'BS Information Technology',
    yearLevel: '2nd Year',
    section: 'IT-2B',
    email: 'yananeverbroke@example.edu',
    status: 'Enrolled',
    standing: 'Good Standing',
    units: 18,
    avatar: '/avatars/yana.png',
    fallback: '👱‍♀️',
    accent: '#008000',
  },
  {
    name: 'Hazel Bojawe',
    studentId: '2026-0003',
    course: 'BS Multimedia Arts',
    yearLevel: '4th Year',
    section: 'MA-4A',
    email: 'akosihezel@example.edu',
    status: 'Enrolled',
    standing: 'Good Standing',
    units: 15,
    avatar: '/avatars/hazel.png',
    fallback: '👩‍🦰',
    accent: '#b03060',
  },
  {
    name: 'Charel Ayuban',
    studentId: '2026-0004',
    course: 'BS Information Systems',
    yearLevel: '1st Year',
    section: 'IS-1C',
    email: 'chagwaps123@example.edu',
    status: 'Not Enrolled',
    standing: 'Pending requirements',
    units: 0,
    avatar: '/avatars/charel.png',
    fallback: '👵',
    accent: '#a05000',
  },
])
</script>

<template>
  <!-- The header and footer are declared once here, so every page shares them. -->
  <div class="page">
    <AppHeader />
    <main>
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>