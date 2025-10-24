# Payments Microservice

Este es el microservicio de pagos para el sistema "Order & Payment System". Simula el procesamiento de pagos y almacena el historial de transacciones.

## Características

- **Framework**: NestJS con TypeScript
- **Puerto**: 3001
- **Almacenamiento**: En memoria (sin base de datos)
- **Simulación**: Aprobación/rechazo aleatorio usando `Math.random()`

## Endpoints

- `POST /payments` - Procesa un pago con `{ orderId: string, amount: number }`, retorna `{ status: 'APPROVED' | 'DECLINED' }`
- `GET /payments` - Lista todos los pagos procesados

## Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run start:dev

# Ejecutar en producción
npm run start:prod
```

## Testing

```bash
# Pruebas unitarias
npm run test

# Pruebas e2e
npm run test:e2e

# Pruebas de mutación con Stryker
npx stryker run
```

## Lógica de Simulación

El procesamiento de pagos simula una aprobación aleatoria:
- Si `Math.random() > 0.5` → `APPROVED`
- De lo contrario → `DECLINED`

Cada pago se guarda en memoria con ID único, orderId, amount y status.

## Docker

Para construir la imagen Docker:

```bash
docker build -t payments-ms .
docker run -p 3001:3001 payments-ms
```
