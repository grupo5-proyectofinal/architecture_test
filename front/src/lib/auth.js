// src/lib/auth.js
import { writable } from 'svelte/store';
import Cookies from 'js-cookie';

export const isAuthenticated = writable(!!Cookies.get('token'));

export function setAuthStatus(status) {
  isAuthenticated.set(status);
}