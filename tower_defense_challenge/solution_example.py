"""
⚠️  ЭТАЛОННОЕ РЕШЕНИЕ — НЕ ПОДГЛЯДЫВАЙ! ⚠️
==========================================

Это решение для проверки. Сначала попробуй решить сам!

Прокрути вниз только если совсем застрял...
"""

# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# ТЫ УВЕРЕН? ПОПРОБУЙ ЕЩЁ РАЗ САМ!
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 


def find_patrol_point(towers: list[tuple[int, int]]) -> tuple[int, int]:
    """
    Решение через взвешенную медиану.
    
    Ключевая идея:
    Функция f(x) = Σ wᵢ × |x - aᵢ| минимизируется во взвешенной медиане.
    
    Взвешенная медиана — это точка, где:
    - сумма весов слева ≤ половины общего веса
    - сумма весов справа ≤ половины общего веса
    
    Алгоритм:
    1. Считаем приоритеты (веса) каждой башни
    2. Сортируем башни по координате
    3. Ищем точку, где накопленный вес достигает половины
    4. Считаем расстояние для этой точки
    
    Сложность: O(n log n) из-за сортировки
    """
    
    if not towers:
        return (0, 0)
    
    # Шаг 1: Создаём список (координата, вес)
    weighted_towers = []
    for x, health in towers:
        priority = 100 - health
        weighted_towers.append((x, priority))
    
    # Шаг 2: Сортируем по координате
    weighted_towers.sort(key=lambda t: t[0])
    
    # Шаг 3: Находим взвешенную медиану
    total_weight = sum(w for _, w in weighted_towers)
    
    cumulative_weight = 0
    median_x = weighted_towers[0][0]  # по умолчанию — первая точка
    
    for x, weight in weighted_towers:
        cumulative_weight += weight
        # Как только накопленный вес >= половины — нашли медиану
        if cumulative_weight >= total_weight / 2:
            median_x = x
            break
    
    # Шаг 4: Вычисляем минимальное взвешенное расстояние
    total_distance = 0
    for x, weight in weighted_towers:
        total_distance += weight * abs(median_x - x)
    
    return (median_x, total_distance)


# ===================== ТЕСТИРОВАНИЕ =====================

def main():
    """Проверка решения на примерах из условия."""
    
    test_cases = [
        ([(10, 80), (25, 30), (40, 90)], 450),
        ([(10, 80), (25, 30), (40, 90), (60, 20)], 3250),
        ([(0, 99), (50, 99), (100, 99)], 100),
        ([(0, 99), (1000000000, 1)], 1000000000),
    ]
    
    print("Проверка эталонного решения:")
    print()
    
    for towers, expected_dist in test_cases:
        patrol_x, total_dist = find_patrol_point(towers)
        status = "✅" if total_dist == expected_dist else "❌"
        print(f"{status} Башни: {towers}")
        print(f"   Результат: точка={patrol_x}, расстояние={total_dist}")
        print(f"   Ожидалось: расстояние={expected_dist}")
        print()


if __name__ == "__main__":
    main()
