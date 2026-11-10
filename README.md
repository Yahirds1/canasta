# CanastaLista

Prototipo Expo para comparar precios de productos de la canasta básica. La app ofrece una vista para teléfono y una pestaña con un reloj de demostración.

## Ejecutar en Expo Go

1. Instala Node.js y Expo Go en tu teléfono.
2. En esta carpeta, ejecuta `npm install` y luego `npx expo start`.
3. Conecta el teléfono y la computadora a la misma red Wi-Fi y escanea el QR con Expo Go.

El proyecto usa Expo SDK 58. Si Expo Go muestra una incompatibilidad, comprueba que tengas la versión más reciente instalada desde [expo.dev/go](https://expo.dev/go).

## Emulador de smartwatch

Abre la pestaña **Reloj** y pulsa **Abrir emulador smartwatch**. El botón abre en el navegador la [demo React del emulador elegido](https://thirsty-davinci-35a9f6.netlify.com/). El código del proyecto original está en [GitHub](https://github.com/haxzie/react-smartwatch-emulator).

El emulador enlazado es una app web independiente. La vista dentro de CanastaLista es una simulación para enseñar cómo se vería un aviso de precio; todavía no está conectada a un reloj físico ni envía notificaciones reales. Los precios del prototipo son ejemplos.

## Comprobaciones

- `npx expo lint`
- `npx tsc --noEmit`
