#MenuTitle: Insert ‖ Between Characters
# -*- coding: utf-8 -*-
"""
Inserts ‖ (double vertical line) between all characters in the current text editor tab.
"""

__doc__ = """
Inserts ‖ between all characters in the text editor workspace.
"""

# Get the current font
font = Glyphs.font

if font and font.currentTab:
    # Get current text from the text editor
    current_text = font.currentTab.text
    
    if current_text:
        # Split the text into individual characters
        chars = list(current_text)
        
        # Insert ‖ between each character
        new_text = "‖".join(chars)
        
        # Set the modified text back to the text editor
        font.currentTab.text = new_text
        
        print("✓ ‖ wurde zwischen alle Zeichen eingefügt")
    else:
        print("⚠ Der Texteditor ist leer")
else:
    print("⚠ Keine Schrift oder kein Tab geöffnet")
