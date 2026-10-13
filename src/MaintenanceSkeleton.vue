<script setup lang="ts">
import { RowGroup, SkeletonSnapshot } from "@intentic/extension-ui";

// Mirrors the real chore book's shape (one surface per kind, rows with icon, title, headline, badge) so the page doesn't
// jump when data lands. Two groups, not four, matching the default 'needs attention' filter. Heights and widths are
// measured against ChoreRow/RowGroup, not guessed. Once the book has been seen for this scope in this sandbox, the imprint
// MaintenanceView takes of it (`imprint`) is drawn instead, in its real kinds, rows and widths; this hand-drawn one only
// covers the first visit.

// The name MaintenanceView keeps the book's imprint under: one per repository scope, since one repository's book and the
// whole workspace's are different lengths.
const { imprint } = defineProps<{ imprint: string }>();

// Widths approximate real content; badge width matches its label's own word length.
const GROUPS = [
    {
        rows: [
            { title: `w-40`, headline: `w-64`, badge: `w-14` },
            { title: `w-32`, headline: `w-44`, badge: `w-9` },
        ],
    },
    {
        rows: [
            { title: `w-36`, headline: `w-80`, badge: `w-14` },
            { title: `w-52`, headline: `w-52`, badge: `w-16` },
        ],
    },
] as const;
</script>

<template>
    <SkeletonSnapshot :of="imprint" label="Reading the evidence">
        <!-- aria-busy, not aria-hidden: silence here reads as no chores due, not as loading. -->
        <div class="flex flex-col gap-6" role="status" aria-busy="true" aria-label="Reading the evidence">
            <RowGroup v-for="(group, index) in GROUPS" :key="index">
                <!-- Padding and line-box height copy ChoreRow's collapsed row exactly, not approximated. -->
                <div v-for="(row, rowIndex) in group.rows" :key="rowIndex" class="border-t border-line/60 px-4 py-2.5 first:border-t-0">
                    <div class="flex h-5 items-center gap-3">
                        <span class="skeleton h-3 w-3 shrink-0"></span>
                        <span class="skeleton h-4 w-4 shrink-0"></span>
                        <span class="skeleton h-3.5 shrink-0" :class="row.title"></span>
                        <!-- The headline takes the flexible column, as it does in the row itself. -->
                        <div class="min-w-0 flex-1">
                            <span class="skeleton block h-3 max-w-full" :class="row.headline"></span>
                        </div>
                        <span class="skeleton h-5 shrink-0 rounded-full" :class="row.badge"></span>
                    </div>
                </div>
            </RowGroup>
        </div>
    </SkeletonSnapshot>
</template>
