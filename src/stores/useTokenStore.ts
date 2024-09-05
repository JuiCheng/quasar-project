/*
 * @FilePath: \stores\useTokenStore.ts
 * @Date: 2024-05-22
 * @Author: MJC
 * @Description: Token管理
 */
import { ref } from 'vue';
import { defineStore } from 'pinia';
export const useTokenStore = defineStore('token', () => {
  const Token = ref('');
  const hasPermission = ref(false);
  const methods = {
    //
    // addProduct(token: string) {
    //   state.Token=token
    // },
    // 更新Token
    update(token: string) {
      Token.value = token;
    },
    // 刪除Token
    delete() {
      Token.value = '';
    },
    setHasPermission(value: boolean) {
      hasPermission.value = value;
    },
  };

  return {
    Token,
    hasPermission,
    ...methods,
  };
});
