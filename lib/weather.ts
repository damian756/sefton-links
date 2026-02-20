// Open-Meteo free API — no key required
// https://open-meteo.com/

export interface WeatherData {
  windSpeed: string;
  windDirection: string;
  windDeg: number;
}

function degreesToCompass(deg: number): string {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return dirs[Math.round(deg / 22.5) % 16];
}

// Southport coastal coordinates (PR8)
const LAT = 53.6456;
const LON = -3.0183;

export async function getSouthportWeather(): Promise<WeatherData | null> {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=windspeed_10m,winddirection_10m&windspeed_unit=mph`,
      {
        next: { revalidate: 1800 }, // cache 30 minutes
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const deg: number = data.current.winddirection_10m;
    const speed = Math.round(data.current.windspeed_10m);
    return {
      windSpeed: `${speed} mph`,
      windDirection: degreesToCompass(deg),
      windDeg: deg,
    };
  } catch {
    return null;
  }
}
