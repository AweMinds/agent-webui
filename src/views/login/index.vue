<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import Info from '@iconify-icons/ri/information-line'
import Lock from '@iconify-icons/ri/lock-fill'
import User from '@iconify-icons/ri/user-3-fill'
import { useRenderIcon } from '@/components/custom/ReIcon/src/hooks'
import bg from '@/assets/login/bg.png'
import Motion from '@/views/login/utils/motion'
import {useAppStore, useUserStoreHook} from '@/store'
import { message } from '@/utils/message';

// 引入重置样式
// import '@/styles/reset.scss'
// 导入公共样式
// import '@/styles/index.scss'
// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
// import '@/styles/lib/tailwind.css'
import 'element-plus/dist/index.css'

const router = useRouter()
const { locale, t } = useI18n()
const dataTheme = ref<boolean>(false)
const loginDay = ref(7)
const loading = ref(false)
const checked = ref(false)
const disabled = ref(false)
const ruleFormRef = ref<FormInstance>()

const appStore = useAppStore()
// const $t = (key: string) => key;

const ruleForm = reactive({
  username: 'demo1@aweminds.cn',
  password: 'demo1',
  verifyCode: '',
})

/** 浅色、深色整体风格切换 */
function dataThemeChange() {
  if (dataTheme.value) {
    document.documentElement.classList.add('dark')
  }
  else {
    appStore.setTheme('light')
    document.documentElement.classList.remove('dark')
  }
}

const onLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      useUserStoreHook()
          .loginByUsername({email: ruleForm.username, password: ruleForm.password})
          .then((res) => {
            if (res.status) {
              router.push("/chat");
              message("登录成功", {type: "success"});
            } else {
              message("登录失败", {type: "error"});
            }
          })
          .finally(() => (loading.value = false));
    } else {
      return fields;
    }
  });
};

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="select-none">
    <img :src="bg" class="wave">
    <div class="flex-c absolute right-5 top-3">
      <!-- 主题 -->
      <el-switch
        v-model="dataTheme"
        inline-prompt
        @change="dataThemeChange"
      />
      <!-- 国际化 -->
      <!--      <el-dropdown trigger="click"> -->
      <!--        <template #dropdown> -->
      <!--          <el-dropdown-menu class="translation"> -->
      <!--            <el-dropdown-item -->
      <!--              style="zh" -->
      <!--              class="dark:!text-white zh" -->
      <!--              @click="translationCh" -->
      <!--            > -->
      <!--              <IconifyIconOffline -->
      <!--                v-show="locale === 'zh'" -->
      <!--                class="check-zh" -->
      <!--                :icon="Check" -->
      <!--              /> -->
      <!--              简体中文 -->
      <!--            </el-dropdown-item> -->
      <!--            <el-dropdown-item -->
      <!--              :style="getDropdownItemStyle(locale, 'en')" -->
      <!--              class="dark:!text-white" :class="[getDropdownItemClass(locale, 'en')]" -->
      <!--              @click="translationEn" -->
      <!--            > -->
      <!--              <span v-show="locale === 'en'" class="check-en"> -->
      <!--                <IconifyIconOffline :icon="Check" /> -->
      <!--              </span> -->
      <!--              English -->
      <!--            </el-dropdown-item> -->
      <!--          </el-dropdown-menu> -->
      <!--        </template> -->
      <!--      </el-dropdown> -->
    </div>
    <div class="login-container">
      <div class="img">
        <img src="@/assets/login/illustration.svg" alt="">
      </div>
      <div class="login-box">
        <div class="login-form">
<!--          <avatar class="avatar" />-->
<!--          <Motion>-->
<!--            <h2 class="outline-none">-->
<!--              <TypeIt-->
<!--                :options="{ strings: ['title'], cursor: false, speed: 100 }"-->
<!--              />-->
<!--            </h2>-->
<!--          </Motion>-->

          <el-form
            v-if="true"
            ref="ruleFormRef"
            :model="ruleForm"
            size="large"
          >
            <Motion :delay="100">
              <el-form-item
                :rules="[
                  {
                    required: true,
                    message: $t('login.pureUsernameReg'),
                    trigger: 'blur',
                  },
                ]"
                prop="username"
              >
                <el-input
                  v-model="ruleForm.username"
                  clearable
                  :placeholder="t('login.pureUsername')"
                  :prefix-icon="useRenderIcon(User)"
                />
              </el-form-item>
            </Motion>

            <Motion :delay="150">
              <el-form-item prop="password">
                <el-input
                  v-model="ruleForm.password"
                  clearable
                  show-password
                  :placeholder="t('login.purePassword')"
                  :prefix-icon="useRenderIcon(Lock)"
                />
              </el-form-item>
            </Motion>

            <!--            <Motion :delay="200"> -->
            <!--              <el-form-item prop="verifyCode"> -->
            <!--                <el-input -->
            <!--                  v-model="ruleForm.verifyCode" -->
            <!--                  clearable -->
            <!--                  :placeholder="t('login.pureVerifyCode')" -->
            <!--                  :prefix-icon="useRenderIcon('ri:shield-keyhole-line')" -->
            <!--                > -->
            <!--                  <template #append> -->
            <!--                    <ReImageVerify v-model:code="imgCode" /> -->
            <!--                  </template> -->
            <!--                </el-input> -->
            <!--              </el-form-item> -->
            <!--            </Motion> -->

            <Motion :delay="250">
              <el-form-item>
                <div class="w-full h-[20px] flex justify-between items-center">
                  <el-checkbox v-model="checked">
                    <span class="flex">
                      <select
                        v-model="loginDay"
                        :style="{
                          width: loginDay < 10 ? '10px' : '16px',
                          outline: 'none',
                          background: 'none',
                          appearance: 'none',
                        }"
                      >
                        <option value="1">1</option>
                        <option value="7">7</option>
                        <option value="30">30</option>
                      </select>
                      {{ t("login.pureRemember") }}
                      <IconifyIconOffline
                        v-tippy="{
                          content: t('login.pureRememberInfo'),
                          placement: 'top',
                        }"
                        :icon="Info"
                        class="ml-1"
                      />
                    </span>
                  </el-checkbox>
                  <el-button
                    link
                    type="primary"
                  >
                    {{ t("login.pureForget") }}
                  </el-button>
                </div>
                <el-button
                  class="w-full mt-4"
                  size="default"
                  type="primary"
                  :loading="loading"
                  :disabled="disabled"
                  @click="onLogin(ruleFormRef)"
                >
                  {{ t("login.pureLogin") }}
                </el-button>
              </el-form-item>
            </Motion>

            <!--            <Motion :delay="300"> -->
            <!--              <el-form-item> -->
            <!--                <div class="w-full h-[20px] flex justify-between items-center"> -->
            <!--                  <el-button -->
            <!--                    v-for="(item, index) in operates" -->
            <!--                    :key="index" -->
            <!--                    class="w-full mt-4" -->
            <!--                    size="default" -->
            <!--                  > -->
            <!--                    {{ t(item.title) }} -->
            <!--                  </el-button> -->
            <!--                </div> -->
            <!--              </el-form-item> -->
            <!--            </Motion> -->
          </el-form>

          <!--          <Motion v-if="true" :delay="350"> -->
          <!--            <el-form-item> -->
          <!--              <el-divider> -->
          <!--                <p class="text-gray-500 text-xs"> -->
          <!--                  {{ t("login.pureThirdLogin") }} -->
          <!--                </p> -->
          <!--              </el-divider> -->
          <!--              <div class="w-full flex justify-evenly"> -->
          <!--                <span -->
          <!--                  v-for="(item, index) in thirdParty" -->
          <!--                  :key="index" -->
          <!--                  :title="t(item.title)" -->
          <!--                > -->
          <!--                  <IconifyIconOnline -->
          <!--                    :icon="`ri:${item.icon}-fill`" -->
          <!--                    width="20" -->
          <!--                    class="cursor-pointer text-gray-500 hover:text-blue-400" -->
          <!--                  /> -->
          <!--                </span> -->
          <!--              </div> -->
          <!--            </el-form-item> -->
          <!--          </Motion> -->
          <!--          &lt;!&ndash; 手机号登录 &ndash;&gt; -->
          <!--          <phone v-if="currentPage === 1" /> -->
          <!--          &lt;!&ndash; 二维码登录 &ndash;&gt; -->
          <!--          <qrCode v-if="currentPage === 2" /> -->
          <!--          &lt;!&ndash; 注册 &ndash;&gt; -->
          <!--          <regist v-if="currentPage === 3" /> -->
          <!--          &lt;!&ndash; 忘记密码 &ndash;&gt; -->
          <!--          <update v-if="currentPage === 4" /> -->
        </div>
      </div>
    </div>
    <div
      class="w-full flex-c absolute bottom-3 text-sm text-[rgba(0,0,0,0.6)] dark:text-[rgba(220,220,242,0.8)]"
    >
      Copyright ©2023 AweMinds. ©2023 深圳奥茗智源科技有限公司  版权所有.
      <a
        class="hover:text-primary"
        href="https://github.com/pure-admin"
        target="_blank"
      >
        &nbsp;{{ title }}
      </a>
    </div>
  </div>
</template>

<style scoped>
@import url("@/styles/login.css");
</style>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}

.translation {
  ::v-deep(.el-dropdown-menu__item) {
    padding: 5px 40px;
  }

  .check-zh {
    position: absolute;
    left: 20px;
  }

  .check-en {
    position: absolute;
    left: 20px;
  }
}
</style>
