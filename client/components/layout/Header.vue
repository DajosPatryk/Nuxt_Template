<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
const { t: globalT } = useMessages('global');
import Icon from "@/public/icon.svg";
import { GithubLogoIcon, GlobeIcon, InstagramLogoIcon, TwitterLogoIcon } from "@radix-icons/vue";

const lastScrollY = ref(0);
const scrollDirection = ref('');
const navContainerRef = ref(null);
const navOpen = ref(false);
const anchors = [
  {
    slug: "socials",
    text: globalT('$navigation.socials'),
    items: [
      {
        text: "Twitter",
        link: "https://twitter.com/TheRealAvalon",
        type: "web",
        icon: TwitterLogoIcon
      },
      {
        text: "Instagram",
        link: "https://www.instagram.com/therealestavalon",
        type: "web",
        icon: InstagramLogoIcon
      },
    ]
  },
  {
    slug: "about",
    text: globalT('$navigation.about'),
    items: [
      {
        text: globalT('$navigation.company'),
        link: "https://avalonia.space",
        type: "web",
        icon: GlobeIcon
      },
      {
        text: globalT('$navigation.portfolio'),
        link: "https://github.com/DajosPatryk",
        type: "web",
        icon: GithubLogoIcon
      },
    ]
  }
];
function initNavAnchors() {
  return anchors.reduce((acc, anchor) => {
    acc[anchor.slug] = false;
    return acc;
  }, {});
}
const navAnchors = ref(initNavAnchors());

function initAnchors() {
    anchors.forEach(anchor => {
      const element = document.querySelector(`.anchor-open[data-slug="${anchor.slug}"]`);
      if (element) {
        anchor.containerHeight = `${element.clientHeight}px`;
        anchor.containerWidth = `${element.clientWidth}px`;
      }
    });
}

watch(navOpen, (newValue) => {
  if (newValue) navContainerRef.value?.addEventListener('mouseover', handleMouseOver);
  else navContainerRef.value?.removeEventListener('mouseover', handleMouseOver);
});

function toggleNav(anchor = null) {
  const val = anchor ? !navAnchors.value[anchor] : false;
  navAnchors.value = Object.keys(navAnchors.value).reduce((acc, key) => {
    acc[key] = key === anchor ? !navAnchors.value[key] : false;
    return acc;
  }, {});
  document.querySelector('.router').style.transform = `scale(${val ? .93 : 1})`;
  navOpen.value = val;
}

function scrollToAnchor(event) {
  event.preventDefault();
  const href = event.currentTarget.getAttribute('href');
  const offsetTop = document.querySelector(href).offsetTop;
  window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  toggleNav();
}

function handleMouseOver(event) {
  if (event.target === navContainerRef.value) {
    toggleNav();
    navContainerRef.value.removeEventListener('mouseover', handleMouseOver);
  }
}

function isDisabled() {
  return Object.values(navAnchors.value).every(value => !value) ? '' : 'disabled';
}

function handleScroll() {
  const currentScrollY = window.scrollY;
  const difference = currentScrollY - lastScrollY.value;

  if (Math.abs(difference) >= 20) {
    scrollDirection.value = difference > 0 ? 'down' : 'up';
    lastScrollY.value = currentScrollY;
  }
}

onMounted(() => {
  initAnchors();
  console.log(anchors)
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header ref="navContainerRef" :class="`navigation-container ${navOpen ? 'open' : ''}`">
    <div :class="`navigation ${scrollDirection === 'down' ? 'closed' : ''}`">
      <div class="navigation-bar md:m-2 m-1">
        <div class="relative md:mr-16 mr-6">
          <NuxtLink to="/">
            <Icon class="md:w-8 md:h-8 w-6 h-6"/>
          </NuxtLink>
        </div>

          <div class="anchors relative flex justify-end items-center whitespace-nowrap">

            <div
                class="anchor-item"
                v-for="(anchor, index) in anchors"
                :key="anchor.slug"
                :class="{ 'mr-4': index !== anchors.length - 1 }"
            >

              <a
                  :class="['text-xs', navAnchors[anchor.slug] ? 'open' : isDisabled()]"
                  @click="toggleNav(anchor.slug)"
              >
                {{ anchor.text }}
              </a>

              <div class="anchor-container">
                <div
                    :class="['animation-container', navAnchors[anchor.slug] ? 'open' : 'disabled']"
                    :style="`
                      height: ${navAnchors[anchor.slug] ? anchor.containerHeight : '0px'};
                      width: ${anchor.containerWidth};
                    `"
                >
                  <div
                      class="anchor-open md:pt-10 pt-4"
                      :data-slug="anchor.slug"
                  >
                    <div
                        v-for="item in anchor.items"
                        class="md:mb-4 mb-4"
                    >
                      <component v-if="item.icon" :is="item.icon" class="inline-block w-4 h-6 mr-1"/>
                      <NuxtLink
                          v-if="item.type === 'route'"
                          :to="item.link"
                          class="text-xs"
                      >
                        {{ item.text }}
                      </NuxtLink>
                      <a
                          v-else
                          :href="item.link"
                          class="text-xs"
                          v-on="{ click: item.type === 'anchor' ? scrollToAnchor : null }"
                      >
                        {{ item.text }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

      </div>
    </div>
  </header>
</template>

<style lang="postcss">
.navigation {
  @apply md:py-0 py-1 absolute;
  background-color: var(--header-background);
  backdrop-filter: blur(24px);
}

.navigation-bar {
  @apply page-pos px-16;
  left: 50%;
  transform: translateX(-50%);
}

.router {
  transform: scale(1);
  transition: all 0.44s cubic-bezier(0.03, 0.49, 0.33, 1);
}

.navigation-container {
  position: fixed;
  z-index: 2;
  height: 100vh;
  width: 100vw;
  pointer-events: none;
  user-select: none;
  padding-right: 0;
}

.navigation-container::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(0px);
  transition: all 0.44s cubic-bezier(0.03, 0.49, 0.33, 1);
}

.navigation {
  top: 0;
  width: 100%;
  pointer-events: all;
  transition: all 0.06s ease-in;
}

.navigation.closed {
  transform: translateY(-100%);
}

.navigation-bar {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.anchor-container {
  position: relative;
}

.navigation-bar > .anchors > .anchor-item > .anchor-container > .animation-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  overflow: hidden;
  height: 0;
  opacity: 0;
  transition: all 0.28s ease-out;
}

.navigation-bar > .anchors > .anchor-item > a {
  transition: all 0.06s ease-out;
}

.navigation-bar > .anchors > .anchor-item > a.disabled {
  color: var(--util-500);
}

.navigation-bar > .anchors > .anchor-item > .anchor-container > .animation-container.open {
  opacity: 1;
  transition: all 0.28s ease-out;
}

.navigation-bar > .anchors > .anchor-item > .anchor-container > .animation-container > .anchor-open {
  position: absolute;
  top: 0;
  left: 0;;
}

.navigation-container.open::before {
  pointer-events: all;
  backdrop-filter: blur(64px);
}

.navigation-container.open .navigation-anchors {
  right: 10vw;
}

</style>