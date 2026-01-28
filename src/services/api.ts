// Simulação de delay de rede
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Função auxiliar para simular chamadas de API
async function mockApiCall<T>(data: T, delayMs = 500): Promise<T> {
  await delay(delayMs);
  return data;
}

export const api = {
  delay,
  mockApiCall,
};
