# CanastaLista

Prototipo Expo de transparencia de precios de alimentos. Compara productos básicos entre tiendas, calcula cuánto cambia el costo de una canasta y permite compartir precios observados en la comunidad. No registra gastos personales.

## Ejecutar en Expo Go

1. Instala Node.js y Expo Go en tu teléfono.
2. En esta carpeta, ejecuta `npm install` y luego `npx expo start`.
3. Conecta el teléfono y la computadora a la misma red Wi-Fi y escanea el QR con Expo Go.

El proyecto usa Expo SDK 58. Si Expo Go muestra una incompatibilidad, comprueba que tengas la versión más reciente instalada desde [expo.dev/go](https://expo.dev/go).

## Emulador de smartwatch

Abre la pestaña **Reloj** para ver la simulación integrada. La hora se actualiza y el aviso refleja el producto seleccionado en Canasta y el precio más bajo reportado. Un precio agregado desde el teléfono actualiza la comparación y el reloj en la misma sesión. También se puede ejecutar aparte el [emulador React de referencia](https://github.com/haxzie/react-smartwatch-emulator).

La vista del reloj es una simulación para mostrar cómo se vería un aviso de precio; todavía no está conectada a un reloj físico ni envía notificaciones reales. Los precios iniciales son ejemplos; los reportes y alertas se guardan solo durante la sesión porque el prototipo aún no usa una base de datos compartida.

## Comprobaciones

- `npx expo lint`
- `npx tsc --noEmit`
