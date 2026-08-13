"""
Визуализация задачи Tower Defense
=================================

Показывает башни, их здоровье и оптимальную точку патрулирования.
Работает в терминале (ASCII-графика).

Запуск: python visualizer.py
"""

from solution_template import find_patrol_point, calculate_total_distance


def visualize(towers: list[tuple[int, int]], title: str = ""):
    """Визуализирует задачу и решение в терминале."""
    
    if not towers:
        print("Нет башен для визуализации")
        return
    
    # Получаем решение
    try:
        result = find_patrol_point(towers)
        if result is None:
            patrol_x, total_dist = None, None
        else:
            patrol_x, total_dist = result
    except:
        patrol_x, total_dist = None, None
    
    # Нормализуем координаты для отображения (ширина 60 символов)
    WIDTH = 60
    xs = [t[0] for t in towers]
    min_x, max_x = min(xs), max(xs)
    
    if patrol_x is not None:
        min_x = min(min_x, patrol_x)
        max_x = max(max_x, patrol_x)
    
    range_x = max_x - min_x if max_x != min_x else 1
    
    def to_screen(x):
        return int((x - min_x) / range_x * (WIDTH - 1))
    
    print()
    print("=" * 70)
    if title:
        print(f"  {title}")
        print("=" * 70)
    
    # Строка с башнями
    tower_line = [' '] * WIDTH
    for x, health in towers:
        pos = to_screen(x)
        priority = 100 - health
        # Символ зависит от приоритета
        if priority >= 70:
            char = '█'  # критично
        elif priority >= 40:
            char = '▓'  # средне
        else:
            char = '░'  # норм
        tower_line[pos] = char
    
    # Строка с дроном
    drone_line = [' '] * WIDTH
    if patrol_x is not None:
        drone_pos = to_screen(patrol_x)
        drone_line[drone_pos] = '◆'
    
    # Линия связи (от дрона к башням)
    connection_line = ['─'] * WIDTH
    for x, _ in towers:
        pos = to_screen(x)
        connection_line[pos] = '┼'
    if patrol_x is not None:
        drone_pos = to_screen(patrol_x)
        connection_line[drone_pos] = '◇'
    
    print()
    print("  Дрон:   ", ''.join(drone_line))
    print("          ", ''.join(connection_line))
    print("  Башни:  ", ''.join(tower_line))
    print()
    
    # Легенда
    print("  Легенда: █=критично(HP<30) ▓=повреждено(HP<60) ░=норм(HP≥60)")
    print("           ◆=дрон  ◇=точка патрулирования")
    print()
    
    # Детали по башням
    print("  Детали башен:")
    print("  " + "-" * 50)
    for i, (x, health) in enumerate(sorted(towers)):
        priority = 100 - health
        bar_len = priority // 5
        bar = '█' * bar_len + '░' * (20 - bar_len)
        print(f"  x={x:>10} | HP={health:>2} | Приоритет={priority:>2} |{bar}|")
    print("  " + "-" * 50)
    
    # Результат
    print()
    if patrol_x is not None:
        print(f"  🎯 Оптимальная точка: x = {patrol_x}")
        print(f"  📊 Взвешенное расстояние: {total_dist}")
        
        # Проверка
        actual = calculate_total_distance(towers, patrol_x)
        if actual == total_dist:
            print(f"  ✅ Проверка пройдена!")
        else:
            print(f"  ❌ Ошибка! Реальное расстояние: {actual}")
    else:
        print("  ⚠️  Решение не реализовано (find_patrol_point вернул None)")
    
    print()
    print("=" * 70)
    print()


def interactive_mode():
    """Интерактивный режим: ввод своих данных."""
    print()
    print("🎮 ИНТЕРАКТИВНЫЙ РЕЖИМ")
    print("Введи башни в формате: x health")
    print("Пустая строка для завершения ввода")
    print()
    
    towers = []
    while True:
        try:
            line = input(f"Башня {len(towers)+1}: ").strip()
            if not line:
                break
            x, health = map(int, line.split())
            if not (1 <= health <= 99):
                print("  ⚠️  Здоровье должно быть от 1 до 99")
                continue
            towers.append((x, health))
        except ValueError:
            print("  ⚠️  Формат: x health (два числа через пробел)")
        except EOFError:
            break
    
    if towers:
        visualize(towers, "Твои данные")


def main():
    print()
    print("🎮 Tower Defense: Визуализатор")
    print()
    
    # Примеры из условия
    examples = [
        ("Пример 1: Три башни", [(10, 80), (25, 30), (40, 90)]),
        ("Пример 2: Четыре башни", [(10, 80), (25, 30), (40, 90), (60, 20)]),
        ("Пример 3: Одинаковые приоритеты", [(0, 99), (50, 99), (100, 99)]),
        ("Пример 4: Одна критичная", [(0, 99), (100, 1)]),
        ("Пример 5: Асимметричные веса", [(0, 99), (10, 99), (20, 99), (30, 99), (100, 1)]),
    ]
    
    for title, towers in examples:
        visualize(towers, title)
    
    # Предложение интерактивного режима
    print()
    print("Хочешь ввести свои данные? Запусти: python visualizer.py --interactive")
    print()


if __name__ == "__main__":
    import sys
    if "--interactive" in sys.argv or "-i" in sys.argv:
        interactive_mode()
    else:
        main()
