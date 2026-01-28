import { api } from "./api";

export interface HotelConfig {
  hotelName: string;
  description: string;
  available: boolean;
  autoAcceptBookings: boolean;
}

const mockConfig: HotelConfig = {
  hotelName: "",
  description: "",
  available: true,
  autoAcceptBookings: false,
};

export const configService = {
  /**
   * Busca configurações do hotel
   */
  async getConfig(): Promise<HotelConfig> {
    return api.mockApiCall(mockConfig);
  },

  /**
   * Salva configurações do hotel
   */
  async saveConfig(config: HotelConfig): Promise<void> {
    console.log("Salvando configurações:", config);
    await api.delay(500);
  },
};
