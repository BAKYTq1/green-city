import React, { useState, useRef, useEffect, useCallback } from "react";
import "./FloorPlan3D.css";

// ============================================
// ДАННЫЕ
// ============================================

const APARTMENTS = [
  { id: 1, block: "А", floor: 3, rooms: 1, area: 42.5, price: "8 500 000 ₸", status: "в продаже", planId: "1k" },
  { id: 2, block: "А", floor: 5, rooms: 1, area: 43.2, price: "8 700 000 ₸", status: "в продаже", planId: "1k" },
  { id: 3, block: "А", floor: 7, rooms: 1, area: 42.5, price: "8 900 000 ₸", status: "бронь", planId: "1k" },
  { id: 4, block: "А", floor: 10, rooms: 2, area: 68.3, price: "13 800 000 ₸", status: "в продаже", planId: "2k" },
  { id: 5, block: "А", floor: 12, rooms: 2, area: 67.8, price: "14 200 000 ₸", status: "в продаже", planId: "2k" },
  { id: 6, block: "Б", floor: 4, rooms: 2, area: 68.3, price: "13 500 000 ₸", status: "в продаже", planId: "2k" },
  { id: 7, block: "Б", floor: 8, rooms: 3, area: 95.8, price: "19 500 000 ₸", status: "сдан", planId: "3k" },
  { id: 8, block: "Б", floor: 15, rooms: 3, area: 96.2, price: "20 100 000 ₸", status: "в продаже", planId: "3k" },
  { id: 9, block: "Б", floor: 18, rooms: 3, area: 95.8, price: "20 500 000 ₸", status: "предзаказ", planId: "3k" },
  { id: 10, block: "В", floor: 5, rooms: 3, area: 95.8, price: "19 200 000 ₸", status: "в продаже", planId: "3k" },
  { id: 11, block: "В", floor: 12, rooms: 4, area: 128.6, price: "28 900 000 ₸", status: "предзаказ", planId: "4k" },
  { id: 12, block: "В", floor: 20, rooms: 4, area: 129.1, price: "29 500 000 ₸", status: "предзаказ", planId: "4k" },
  { id: 13, block: "А", floor: 2, rooms: 0, area: 24.42, price: "4 900 000 ₸", status: "в продаже", planId: "studio" },
  { id: 14, block: "А", floor: 6, rooms: 0, area: 24.42, price: "5 200 000 ₸", status: "в продаже", planId: "studio" },
  { id: 15, block: "Б", floor: 1, rooms: 0, area: 57.24, price: "11 500 000 ₸", status: "коммерция", planId: "commercial" },
];

const FLOORPLANS = {
  "1k": {
    id: "1k", type: "1-комнатная", area: 42.5,
    rooms: [
      { id: "living", label: "Гостиная-кухня", x: 0, y: 0, w: 220, h: 220, area: "28.4" },
      { id: "bedroom", label: "Спальня", x: 220, y: 0, w: 140, h: 140, area: "12.6" },
      { id: "bath", label: "С/У", x: 220, y: 140, w: 80, h: 80, area: "3.8" },
    ],
    furniture: [
      { type: "sofa", x: 20, y: 30, w: 130, h: 50, label: "Диван" },
      { type: "bed", x: 230, y: 20, w: 100, h: 100, label: "Кровать" },
    ],
    windows: [{ x: 20, y: 0, w: 60 }],
  },
  "2k": {
    id: "2k", type: "2-комнатная", area: 68.3,
    rooms: [
      { id: "living", label: "Гостиная", x: 0, y: 0, w: 200, h: 170, area: "22.0" },
      { id: "kitchen", label: "Кухня", x: 200, y: 0, w: 160, h: 100, area: "12.5" },
      { id: "bedroom1", label: "Спальня", x: 0, y: 170, w: 160, h: 140, area: "16.8" },
      { id: "bedroom2", label: "Детская", x: 160, y: 170, w: 120, h: 140, area: "12.0" },
      { id: "bath", label: "С/У", x: 280, y: 100, w: 80, h: 70, area: "4.2" },
    ],
    furniture: [
      { type: "sofa", x: 20, y: 30, w: 130, h: 50, label: "Диван" },
      { type: "bed", x: 10, y: 180, w: 100, h: 120, label: "Кровать" },
    ],
    windows: [{ x: 20, y: 0, w: 60 }, { x: 220, y: 0, w: 80 }],
  },
  "3k": {
    id: "3k", type: "3-комнатная", area: 95.8,
    rooms: [
      { id: "living", label: "Гостиная", x: 0, y: 0, w: 220, h: 160, area: "28.4" },
      { id: "kitchen", label: "Кухня", x: 220, y: 0, w: 140, h: 160, area: "14.2" },
      { id: "bedroom1", label: "Спальня", x: 0, y: 160, w: 180, h: 140, area: "18.6" },
      { id: "bedroom2", label: "Детская", x: 180, y: 160, w: 140, h: 140, area: "12.8" },
      { id: "bath", label: "С/У", x: 320, y: 160, w: 40, h: 140, area: "4.2" },
    ],
    furniture: [
      { type: "sofa", x: 20, y: 30, w: 130, h: 50, label: "Диван" },
      { type: "bed", x: 10, y: 170, w: 100, h: 120, label: "Кровать" },
    ],
    windows: [{ x: 30, y: 0, w: 50 }, { x: 140, y: 0, w: 60 }, { x: 250, y: 0, w: 80 }],
  },
  "4k": {
    id: "4k", type: "4-комнатная", area: 128.6,
    rooms: [
      { id: "living", label: "Гостиная", x: 0, y: 0, w: 200, h: 180, area: "32.0" },
      { id: "kitchen", label: "Кухня", x: 200, y: 0, w: 160, h: 100, area: "14.5" },
      { id: "bedroom1", label: "Спальня", x: 0, y: 180, w: 150, h: 140, area: "16.8" },
      { id: "bedroom2", label: "Детская", x: 150, y: 180, w: 130, h: 140, area: "14.2" },
      { id: "bedroom3", label: "Гостевая", x: 280, y: 180, w: 80, h: 100, area: "8.5" },
      { id: "bath", label: "Ванная", x: 280, y: 100, w: 80, h: 80, area: "5.0" },
    ],
    furniture: [
      { type: "sofa", x: 20, y: 30, w: 140, h: 55, label: "Диван" },
      { type: "bed", x: 10, y: 195, w: 110, h: 110, label: "Кровать" },
    ],
    windows: [{ x: 20, y: 0, w: 70 }, { x: 220, y: 0, w: 90 }],
  },
  "studio": {
    id: "studio", type: "Студия", area: 24.42,
    rooms: [
      { id: "living", label: "Студия", x: 0, y: 0, w: 300, h: 260, area: "24.42" },
      { id: "bath", label: "С/У", x: 240, y: 0, w: 60, h: 80, area: "3.2" },
    ],
    furniture: [
      { type: "sofa", x: 30, y: 30, w: 120, h: 50, label: "Диван" },
      { type: "bed", x: 30, y: 130, w: 100, h: 80, label: "Кровать" },
      { type: "counter", x: 30, y: 220, w: 150, h: 35, label: "Кухня" },
    ],
    windows: [{ x: 20, y: 0, w: 80 }, { x: 160, y: 0, w: 80 }],
  },
  "commercial": {
    id: "commercial", type: "Коммерция", area: 57.24,
    rooms: [
      { id: "main", label: "Основное помещение", x: 0, y: 0, w: 300, h: 280, area: "57.24" },
    ],
    furniture: [],
    windows: [{ x: 20, y: 0, w: 100 }, { x: 180, y: 0, w: 80 }],
  },
};

const FLOORS = Array.from({ length: 22 }, (_, i) => i + 1);
const BLOCKS = ["А", "Б", "В"];
const ROOM_COUNTS = [0, 1, 2, 3, 4];

const PLAN_W = 360;
const PLAN_H = 310;
// Масштаб: 360px = ~18м, значит 1px ≈ 0.05м
const PX_TO_M = 18 / 360;

const STATUS_CONFIG = {
  "в продаже": { color: "#2d7a3a", bg: "rgba(45,122,58,0.12)", label: "В продаже" },
  "бронь":     { color: "#b45309", bg: "rgba(180,83,9,0.12)",   label: "Бронь" },
  "предзаказ": { color: "#5b21b6", bg: "rgba(91,33,182,0.12)",  label: "Предзаказ" },
  "коммерция": { color: "#0e7490", bg: "rgba(14,116,144,0.12)", label: "Коммерция" },
  "сдан":      { color: "#166534", bg: "rgba(22,101,52,0.12)",  label: "Сдан" },
};

const ROOM_COLORS = [
  { bg: "#f0fdf4", border: "#bbf7d0", active: "#dcfce7", text: "#166534" },
  { bg: "#f0fdf4", border: "#86efac", active: "#bbf7d0", text: "#15803d" },
  { bg: "#fafaf9", border: "#d6d3d1", active: "#e7e5e4", text: "#44403c" },
  { bg: "#fefce8", border: "#fde68a", active: "#fef9c3", text: "#854d0e" },
  { bg: "#eff6ff", border: "#bfdbfe", active: "#dbeafe", text: "#1d4ed8" },
  { bg: "#fdf4ff", border: "#e9d5ff", active: "#f3e8ff", text: "#7e22ce" },
];

export default function FloorPlan3D() {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [areaRange, setAreaRange] = useState({ min: 20, max: 130 });
  const [selectedRooms, setSelectedRooms] = useState(null);
  const [showFilters, setShowFilters] = useState(true);
  const [filteredApartments, setFilteredApartments] = useState(APARTMENTS);
  const [selectedApartment, setSelectedApartment] = useState(null);

  // FIX: activeRoom хранит ID (строку), не объект
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [viewMode, setViewMode] = useState("3d");
  const [hoveredRoom, setHoveredRoom] = useState(null);
  const [layers, setLayers] = useState({ furniture: true, windows: true });
  const [measuring, setMeasuring] = useState(false);
  const [measurePoints, setMeasurePoints] = useState([]);
  const [measureDistance, setMeasureDistance] = useState(null);

  // FIX: правильные начальные углы для видимого 3D
  const [rotX, setRotX] = useState(50);
  const [rotY, setRotY] = useState(-30);
  const [dragging, setDragging] = useState(false);

  const startRef = useRef(null);
  const rotRef = useRef({ x: 50, y: -30 });
  const rafRef = useRef(null);
  // FIX: ref на сам 3D-контейнер для правильного cursor
  const viewportRef = useRef(null);

  useEffect(() => {
    let filtered = [...APARTMENTS];
    if (selectedBlock) filtered = filtered.filter(a => a.block === selectedBlock);
    if (selectedFloor) filtered = filtered.filter(a => a.floor === selectedFloor);
    if (selectedRooms !== null) filtered = filtered.filter(a => a.rooms === selectedRooms);
    filtered = filtered.filter(a => a.area >= areaRange.min && a.area <= areaRange.max);
    setFilteredApartments(filtered);
  }, [selectedBlock, selectedFloor, selectedRooms, areaRange]);

  const resetFilters = () => {
    setSelectedBlock(null);
    setSelectedFloor(null);
    setSelectedRooms(null);
    setAreaRange({ min: 20, max: 130 });
  };

  const selectApartment = (apt) => {
    setSelectedApartment(apt);
    setActiveRoomId(null);
    setMeasurePoints([]);
    setMeasureDistance(null);
    setMeasuring(false);
    rotRef.current = { x: 50, y: -30 };
    setRotX(50);
    setRotY(-30);
  };

  const currentPlan = selectedApartment ? FLOORPLANS[selectedApartment.planId] : null;
  // FIX: получаем объект комнаты по activeRoomId
  const activeRoomObj = currentPlan?.rooms.find(r => r.id === activeRoomId) || null;
  const totalArea = currentPlan?.rooms.reduce((s, r) => s + parseFloat(r.area), 0).toFixed(1) || 0;

  // FIX: drag работает только по viewportRef, не по всему документу
  const onPointerDown = useCallback((e) => {
    if (viewMode !== "3d" || measuring || !selectedApartment) return;
    e.preventDefault();
    setDragging(true);
    startRef.current = {
      px: e.clientX,
      py: e.clientY,
      rx: rotRef.current.x,
      ry: rotRef.current.y,
    };
    viewportRef.current?.setPointerCapture(e.pointerId);
  }, [viewMode, measuring, selectedApartment]);

  const onPointerMove = useCallback((e) => {
    if (!dragging || !startRef.current) return;
    const dx = e.clientX - startRef.current.px;
    const dy = e.clientY - startRef.current.py;
    const newY = startRef.current.ry + dx * 0.45;
    const newX = Math.max(15, Math.min(70, startRef.current.rx + dy * 0.35));
    rotRef.current = { x: newX, y: newY };
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setRotX(newX);
      setRotY(newY);
    });
  }, [dragging]);

  const onPointerUp = useCallback(() => {
    setDragging(false);
    startRef.current = null;
  }, []);

  const addMeasurePoint = (e) => {
    if (!measuring || !selectedApartment) return;
    const rect = e.currentTarget.getBoundingClientRect();
    // FIX: координаты относительно SVG-плана с учётом масштаба
    const scaleX = PLAN_W / rect.width;
    const scaleY = PLAN_H / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    const newPoints = [...measurePoints, { x, y }];
    setMeasurePoints(newPoints);
    if (newPoints.length === 2) {
      const dx = (newPoints[1].x - newPoints[0].x) * PX_TO_M;
      const dy = (newPoints[1].y - newPoints[0].y) * PX_TO_M;
      // FIX: расстояние в метрах, не пикселях
      const dist = Math.sqrt(dx * dx + dy * dy).toFixed(2);
      setMeasureDistance(dist);
      setMeasuring(false);
    }
  };

  const presets = [
    { label: "Сверху", rx: 68, ry: 0 },
    { label: "Перспектива", rx: 50, ry: -30 },
    { label: "Фасад", rx: 18, ry: 0 },
  ];

  const goPreset = (p) => {
    rotRef.current = { x: p.rx, y: p.ry };
    setRotX(p.rx);
    setRotY(p.ry);
  };

  const is3D = viewMode === "3d";
  // FIX: высота стен пропорционально плану
  const WALL_H = 60;

  return (
    <div className="fp-root">

      {/* ── HEADER ── */}
      <div className="fp-header">
        <div className="fp-header-left">
          <div className="fp-logo">
            <svg viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M12 28L12 18L20 10L28 18L28 28Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M16 28L16 22L24 22L24 28" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
          <div>
            <div className="fp-header-title">Green City <span>— Выбор квартиры</span></div>
            <div className="fp-header-sub">
              {selectedApartment
                ? `${currentPlan?.type} · ${selectedApartment.area} м² · Блок ${selectedApartment.block}, ${selectedApartment.floor} этаж`
                : "Выберите квартиру из списка слева"}
            </div>
          </div>
        </div>

        <div className="fp-header-actions">
          <button className={`fp-btn ${showFilters ? "fp-btn--active" : ""}`} onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? "Скрыть фильтры" : "Фильтры"}
          </button>
          {selectedApartment && (
            <button
              className={`fp-btn ${measuring ? "fp-btn--active" : ""}`}
              onClick={() => { setMeasuring(!measuring); setMeasurePoints([]); setMeasureDistance(null); }}
            >
              {measuring ? "Отмена" : "Линейка"}
            </button>
          )}
          <button
            className="fp-btn"
            onClick={() => setViewMode(is3D ? "2d" : "3d")}
          >
            {is3D ? "2D план" : "3D вид"}
          </button>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="fp-body">

        {/* ── ЛЕВАЯ ПАНЕЛЬ ── */}
        <div className="fp-sidebar">

          {/* Фильтры */}
          {showFilters && (
            <div className="fp-filters">
              <div className="fp-section-label">Подбор квартиры</div>

              <div className="fp-filter-group">
                <div className="fp-filter-label">Блок</div>
                <div className="fp-chips">
                  {BLOCKS.map(b => (
                    <button
                      key={b}
                      className={`fp-chip ${selectedBlock === b ? "fp-chip--active" : ""}`}
                      onClick={() => setSelectedBlock(selectedBlock === b ? null : b)}
                    >{b}</button>
                  ))}
                </div>
              </div>

              <div className="fp-filter-group">
                <div className="fp-filter-label">Этаж</div>
                <div className="fp-floor-grid">
                  {FLOORS.map(f => (
                    <button
                      key={f}
                      className={`fp-chip fp-chip--sm ${selectedFloor === f ? "fp-chip--active" : ""}`}
                      onClick={() => setSelectedFloor(selectedFloor === f ? null : f)}
                    >{f}</button>
                  ))}
                </div>
              </div>

              <div className="fp-filter-group">
                <div className="fp-filter-label">Площадь: {areaRange.min}–{areaRange.max} м²</div>
                <div className="fp-range-row">
                  <input type="range" min={20} max={130} value={areaRange.min}
                    onChange={e => setAreaRange(prev => ({ ...prev, min: +e.target.value }))} />
                  <input type="range" min={20} max={130} value={areaRange.max}
                    onChange={e => setAreaRange(prev => ({ ...prev, max: +e.target.value }))} />
                </div>
              </div>

              <div className="fp-filter-group">
                <div className="fp-filter-label">Комнат</div>
                <div className="fp-chips">
                  {ROOM_COUNTS.map(r => (
                    <button
                      key={r}
                      className={`fp-chip ${selectedRooms === r ? "fp-chip--active" : ""}`}
                      onClick={() => setSelectedRooms(selectedRooms === r ? null : r)}
                    >{r === 0 ? "С" : r}</button>
                  ))}
                </div>
              </div>

              <button className="fp-reset" onClick={resetFilters}>Сбросить фильтры</button>
            </div>
          )}

          {/* Список квартир */}
          <div className="fp-apt-list">
            <div className="fp-section-label">
              Квартиры <span className="fp-count">{filteredApartments.length}</span>
            </div>

            {filteredApartments.length === 0 ? (
              <div className="fp-empty">
                Ничего не найдено
                <button onClick={resetFilters}>Сбросить</button>
              </div>
            ) : (
              filteredApartments.map(apt => {
                const sc = STATUS_CONFIG[apt.status] || STATUS_CONFIG["в продаже"];
                const isActive = selectedApartment?.id === apt.id;
                return (
                  <div
                    key={apt.id}
                    className={`fp-apt-card ${isActive ? "fp-apt-card--active" : ""}`}
                    onClick={() => selectApartment(apt)}
                  >
                    <div className="fp-apt-top">
                      <span className="fp-apt-type">
                        {apt.rooms === 0 ? "Студия" : `${apt.rooms}-комн.`}
                      </span>
                      <span className="fp-apt-status" style={{ color: sc.color, background: sc.bg }}>
                        {sc.label}
                      </span>
                    </div>
                    <div className="fp-apt-price">{apt.price}</div>
                    <div className="fp-apt-meta">
                      <span>Блок {apt.block}</span>
                      <span>{apt.floor} эт.</span>
                      <span>{apt.area} м²</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ── 3D VIEWPORT ── */}
        <div
          ref={viewportRef}
          className={`fp-viewport ${dragging ? "fp-viewport--dragging" : ""} ${measuring ? "fp-viewport--measuring" : ""}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onClick={measuring ? addMeasurePoint : undefined}
        >
          {!selectedApartment ? (
            <div className="fp-placeholder">
              <div className="fp-placeholder-icon">
                <svg viewBox="0 0 40 40" fill="none" width="48" height="48">
                  <circle cx="20" cy="20" r="18" stroke="#2d7a3a" strokeWidth="1.5"/>
                  <path d="M12 28L12 18L20 10L28 18L28 28Z" stroke="#2d7a3a" strokeWidth="1.5" fill="none"/>
                  <path d="M16 28L16 22L24 22L24 28" stroke="#2d7a3a" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>
              <p>Выберите квартиру из списка</p>
              <span>Здесь появится интерактивный план</span>
            </div>
          ) : (
            <>
              {/* FIX: правильная 3D-сцена с perspective на обёртке и preserve-3d на всех уровнях */}
              <div className="fp-scene">
                <div
                  className="fp-scene-inner"
                  style={{
                    transform: is3D
                      ? `rotateX(${rotX}deg) rotateY(${rotY}deg)`
                      : "rotateX(0deg) rotateY(0deg)",
                    transition: dragging ? "none" : "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
                  }}
                >
                  {/* Пол */}
                  <div className="fp-floor-base" />

                  {/* Комнаты */}
                  {currentPlan?.rooms.map((room, idx) => {
                    const rc = ROOM_COLORS[idx % ROOM_COLORS.length];
                    const isActiveR = activeRoomId === room.id;
                    const isHovered = hoveredRoom === room.id;
                    return (
                      <React.Fragment key={room.id}>
                        {/* Пол комнаты (горизонтальная грань) */}
                        <div
                          className="fp-room"
                          style={{
                            left: room.x,
                            top: room.y,
                            width: room.w,
                            height: room.h,
                            background: isActiveR ? rc.active : (isHovered ? rc.active : rc.bg),
                            borderColor: isActiveR ? "#2d7a3a" : (isHovered ? "#4a9e5c" : rc.border),
                          }}
                          onClick={e => { e.stopPropagation(); setActiveRoomId(isActiveR ? null : room.id); }}
                          onMouseEnter={() => setHoveredRoom(room.id)}
                          onMouseLeave={() => setHoveredRoom(null)}
                        >
                          <span className="fp-room-label" style={{ color: isActiveR ? "#2d7a3a" : rc.text }}>
                            {room.label}
                          </span>
                          <span className="fp-room-area" style={{ color: isActiveR ? "#2d7a3a" : rc.text }}>
                            {room.area} м²
                          </span>
                        </div>

                        {/* FIX: стены — 4 грани через CSS 3D transforms */}
                        {is3D && (
                          <>
                            {/* Передняя стена */}
                            <div className="fp-wall fp-wall--front" style={{
                              left: room.x,
                              top: room.y + room.h,
                              width: room.w,
                              height: WALL_H,
                              background: isActiveR ? "#d1fae5" : "#f3f4f6",
                              borderColor: isActiveR ? "#2d7a3a" : "#e5e7eb",
                              transformOrigin: "top center",
                              transform: "rotateX(-90deg)",
                            }} />
                            {/* Правая стена */}
                            <div className="fp-wall fp-wall--right" style={{
                              left: room.x + room.w,
                              top: room.y,
                              width: WALL_H,
                              height: room.h,
                              background: isActiveR ? "#bbf7d0" : "#e5e7eb",
                              borderColor: isActiveR ? "#2d7a3a" : "#d1d5db",
                              transformOrigin: "left center",
                              transform: "rotateY(90deg)",
                            }} />
                          </>
                        )}
                      </React.Fragment>
                    );
                  })}

                  {/* Мебель */}
                  {layers.furniture && currentPlan?.furniture?.map((f, i) => (
                    <div key={`furn-${i}`} className="fp-furniture" style={{
                      left: f.x, top: f.y, width: f.w, height: f.h,
                      borderRadius: f.type === "bed" ? 4 : (f.type === "counter" ? 3 : 6),
                    }}>
                      {f.label}
                    </div>
                  ))}

                  {/* Окна */}
                  {layers.windows && currentPlan?.windows?.map((w, i) => (
                    <div key={`win-${i}`} className="fp-window" style={{
                      left: w.x, top: -2, width: w.w,
                    }} />
                  ))}

                  {/* Линейка — точки и линия */}
                  {measurePoints.map((pt, i) => (
                    <div key={`mpt-${i}`} className="fp-measure-dot" style={{ left: pt.x, top: pt.y }} />
                  ))}
                  {measurePoints.length === 2 && (
                    <svg className="fp-measure-line" style={{ position: "absolute", left: 0, top: 0, width: PLAN_W, height: PLAN_H, pointerEvents: "none", zIndex: 20 }}>
                      <line
                        x1={measurePoints[0].x} y1={measurePoints[0].y}
                        x2={measurePoints[1].x} y2={measurePoints[1].y}
                        stroke="#2d7a3a" strokeWidth="1.5" strokeDasharray="6,3"
                      />
                    </svg>
                  )}
                  {measureDistance && (
                    <div className="fp-measure-label" style={{
                      left: (measurePoints[0].x + measurePoints[1].x) / 2,
                      top: (measurePoints[0].y + measurePoints[1].y) / 2 - 20,
                    }}>
                      {measureDistance} м
                    </div>
                  )}

                  {/* Подпись снизу */}
                  {is3D && (
                    <div className="fp-base-label">
                      GREEN CITY · {currentPlan?.type} · {selectedApartment?.area} м²
                    </div>
                  )}
                </div>
              </div>

              {/* Подсказка и пресеты */}
              {is3D && !measuring && (
                <div className="fp-hint">Тяните для поворота</div>
              )}
              {measuring && (
                <div className="fp-hint fp-hint--measure">
                  {measurePoints.length === 0 ? "Нажмите первую точку" : "Нажмите вторую точку"}
                </div>
              )}

              {is3D && (
                <div className="fp-presets">
                  {presets.map(p => (
                    <button key={p.label} className="fp-preset-btn" onClick={() => goPreset(p)}>
                      {p.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Слои */}
              <div className="fp-layers">
                <label className="fp-layer-toggle">
                  <input type="checkbox" checked={layers.furniture}
                    onChange={() => setLayers(prev => ({ ...prev, furniture: !prev.furniture }))} />
                  <span>Мебель</span>
                </label>
                <label className="fp-layer-toggle">
                  <input type="checkbox" checked={layers.windows}
                    onChange={() => setLayers(prev => ({ ...prev, windows: !prev.windows }))} />
                  <span>Окна</span>
                </label>
              </div>
            </>
          )}
        </div>

        {/* ── ПРАВАЯ ПАНЕЛЬ ── */}
        {selectedApartment && (
          <div className="fp-details">
            <div className="fp-price-card">
              <div className="fp-detail-label">Стоимость</div>
              <div className="fp-price">{selectedApartment.price}</div>
              <div className="fp-status-badge" style={{
                color: STATUS_CONFIG[selectedApartment.status]?.color,
                background: STATUS_CONFIG[selectedApartment.status]?.bg,
              }}>
                {STATUS_CONFIG[selectedApartment.status]?.label}
              </div>
            </div>

            <div className="fp-char-block">
              <div className="fp-section-label">Характеристики</div>
              {[
                ["Тип", currentPlan?.type],
                ["Площадь", `${selectedApartment.area} м²`],
                ["Блок", `Блок ${selectedApartment.block}`],
                ["Этаж", `${selectedApartment.floor} из 22`],
                ["Потолки", "2.85 м"],
              ].map(([k, v]) => (
                <div key={k} className="fp-char-row">
                  <span>{k}</span>
                  <span>{v}</span>
                </div>
              ))}
            </div>

            {/* FIX: показываем activeRoomObj (объект), не activeRoomId (строку) */}
            {activeRoomObj && (
              <div className="fp-room-detail">
                <div className="fp-section-label">Выбранная комната</div>
                <div className="fp-room-name">{activeRoomObj.label}</div>
                <div className="fp-room-area-detail">{activeRoomObj.area} м²</div>
              </div>
            )}

            <div className="fp-total-card">
              <div className="fp-detail-label">Общая площадь</div>
              <div className="fp-total-area">{totalArea} <span>м²</span></div>
            </div>

            <button className="fp-cta">Записаться на просмотр</button>
          </div>
        )}
      </div>
    </div>
  );
}