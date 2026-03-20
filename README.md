# Weather App

현재 위치 기반 날씨 정보와 5일간의 예보를 제공하는 웹 애플리케이션입니다.

---

## 기술 스택

- **React** + **TypeScript**
- **Vite**
- **TanStack Query (React Query)** - 서버 상태 관리 및 캐싱
- **Tailwind CSS** - 스타일링
- **react-icons/wi** - 날씨 아이콘

---

## 주요 기능

- 현재 위치 기반 날씨 자동 조회 (Geolocation API)
- 도시명 검색으로 다른 지역 날씨 조회
- 내 위치로 돌아가기 (My 버튼)
- 시간별 기온 및 날씨 아이콘 표시 (40개 데이터 스크롤)
- 날짜별 예보 카드 (최고/최저 기온)
- 날짜 카드 클릭 시 모달로 시간별 상세 예보 확인
- 날씨 상태에 따른 배경 이미지 자동 변경
- 존재하지 않는 도시 검색 시 에러 알림

---

## 프로젝트 구조

```
src/
├── api/
│   └── weather.ts          # OpenWeatherMap API 호출 함수
├── components/
│   ├── Header.tsx           # 도시명, 현재 시간, 검색바
│   ├── Searchbar.tsx        # 도시 검색 input + 버튼
│   ├── WeatherContent.tsx   # 현재 날씨 (기온, 설명, 체감온도, 습도, 기압)
│   ├── HourlyWeather.tsx    # 시간별 기온 스크롤
│   ├── NextWeather.tsx      # 날짜별 예보 카드
│   ├── WeatherIcon.tsx      # 날씨 아이콘 컴포넌트
│   └── Modal.tsx            # 날짜별 상세 예보 모달
├── hooks/
│   └── useWeather.ts        # 날씨 관련 로직 커스텀 훅
├── types/
│   └── weather.ts           # 타입 정의
├── util/
│   └── weather.tsx          # 유틸 함수
├── assets/                  # 날씨별 배경 이미지
├── App.tsx
└── main.tsx
```

---

## 시작하기

```bash
# 패키지 설치
npm install

# .env 파일 생성 (프로젝트 루트)
VITE_API_KEY=your_openweathermap_api_key

# 개발 서버 실행
npm run dev
```

---

## 구현 상세

### 서버 상태 관리

`useQuery`로 현재 날씨와 5일 예보를 각각 관리합니다. `coords`를 `queryKey`에 포함시켜 위치가 바뀌면 자동으로 재요청합니다.

```typescript
const { data: weather } = useQuery<Weather>({
  queryKey: ["weather", coords],
  queryFn: () => getWeather(coords!.lat, coords!.lon),
  enabled: !!coords,
});
```

`staleTime`을 10분으로 설정해 같은 위치의 중복 API 호출을 방지합니다.

### 위치 처리 구조

```
Geolocation API → coords, myCoords 저장
도시 검색       → Geocoding API → coords 업데이트
My 버튼         → myCoords로 coords 복원
coords 변경     → useQuery 자동 재실행
```

### 날짜별 그룹핑

5일치 40개 데이터를 `groupByDate`로 날짜별로 묶어 캐싱된 데이터만으로 날짜 전환을 처리합니다.

```typescript
// { "2024-03-19": [...8개], "2024-03-20": [...8개], ... }
export function groupByDate(list: Weather5Days["list"]) {
  return list.reduce(
    (acc, item) => {
      const date = item.dt_txt.slice(0, 10);
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    },
    {} as Record<string, Weather5Days["list"]>,
  );
}
```

### 날씨별 배경 이미지

`weather[0].main` 값에 따라 배경 이미지를 자동으로 교체합니다.

| 날씨                 | 배경             |
| -------------------- | ---------------- |
| Clear                | Sunny2.jpg       |
| Clouds               | Clouds.jpg       |
| Rain / Drizzle       | Rain.jpg         |
| Thunderstorm         | Thunderstorm.jpg |
| Snow                 | Snow.jpg         |
| Haze / Fog / Mist 등 | Foggy.jpg        |
