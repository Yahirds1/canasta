# Rescate Local

Prototipo Expo de economía circular local. Conecta comercios que tienen excedentes de alimentos al final del día con personas que pueden comprarlos con descuento y recogerlos en tienda. Busca reducir desperdicio, recuperar parte del valor para el comercio y ampliar el acceso a comida rebajada. No registra gastos personales.

## Ejecutar en Expo Go

1. Instala Node.js y Expo Go en tu teléfono.
2. En esta carpeta, ejecuta `npm install` y luego `npx expo start`.
3. Conecta el teléfono y la computadora a la misma red Wi-Fi y escanea el QR con Expo Go.

El proyecto usa Expo SDK 58. Si Expo Go muestra una incompatibilidad, comprueba que tengas la versión más reciente instalada desde [expo.dev/go](https://expo.dev/go).

## Demostración

- Explora ofertas de ejemplo filtradas por categoría y busca por producto, comercio o colonia.
- Aparta unidades para recogerlas en tienda; el inventario disponible disminuye y el indicador de impacto se actualiza.
- Publica un excedente con precio original y rebajado para añadir una oferta durante la sesión.
- Abre la pestaña **Reloj** para mostrar una oferta con descuento, ubicación y horario de recogida en una simulación de smartwatch.

Las ofertas son ficticias. Publicaciones y apartados viven solo en memoria mientras la app está abierta; no hay pagos integrados, backend, validación de comercios ni notificaciones a un reloj físico.

## Emulador externo

El [emulador React de referencia](https://github.com/haxzie/react-smartwatch-emulator) corre como una web independiente. La pestaña Reloj de esta app es una simulación integrada y sus datos no se sincronizan con esa página externa.

## Comprobaciones

- `npx expo lint`
- `npx tsc --noEmit`
