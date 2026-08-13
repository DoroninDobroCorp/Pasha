"""
Tower Defense: Оптимальная точка патрулирования дрона
=====================================================

Твоя задача: реализовать функцию find_patrol_point()

Не меняй сигнатуру функции и формат вывода!
"""


def find_patrol_point(towers: list[tuple[int, int]]) -> tuple[int, int]:
    """
    Находит оптимальную точку патрулирования для ремонтного дрона.
    
    Args:
        towers: список кортежей (x, health), где
                x — координата башни (int)
                health — текущее здоровье башни (1-99)
    
    Returns:
        (patrol_x, total_weighted_distance): 
            patrol_x — оптимальная координата (int)
            total_weighted_distance — минимальное взвешенное расстояние (int)
    
    Примеры:
        >>> find_patrol_point([(10, 80), (25, 30), (40, 90)])
        (25, 450)
        
        >>> find_patrol_point([(0, 99), (1000000000, 1)])
        (1000000000, 99000000000)
    """
    
    # ==================== ТВОЙ КОД ЗДЕСЬ ====================
    
    # Шаг 1: Вычисли приоритеты башен (priority = 100 - health)
    # priorities = ...
    
    # Шаг 2: Подумай, как найти оптимальную точку
    # Подсказка: это связано с понятием "взвешенная медиана"
    
    # Шаг 3: Вычисли минимальное взвешенное расстояние
    
    pass  # Удали эту строку и напиши своё решение!
    
    # ========================================================


def calculate_total_distance(towers: list[tuple[int, int]], patrol_x: int) -> int:
    """
    Вспомогательная функция: вычисляет взвешенное расстояние для заданной точки.
    Можешь использовать для проверки своего решения.
    """
    total = 0
    for x, health in towers:
        priority = 100 - health
        distance = abs(patrol_x - x)
        total += priority * distance
    return total


# ===================== НЕ МЕНЯЙ КОД НИЖЕ =====================

def main():
    """Чтение входных данных и вывод результата."""
    n = int(input())
    towers = []
    for _ in range(n):
        x, health = map(int, input().split())
        towers.append((x, health))
    
    patrol_x, total_distance = find_patrol_point(towers)
    print(patrol_x, total_distance)


if __name__ == "__main__":
    main()
