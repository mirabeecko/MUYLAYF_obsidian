---
tags:
  - tools_vyvojare
---
```python


def find_notes_with_hashtag(path, hashtag): combined_content = "" for filename in os.listdir(path): if filename.endswith(".md"): with open(os.path.join(path, filename), 'r', encoding='utf-8') as file: content = file.read() if hashtag in content: combined_content += f"\n---\n# {filename}\n\n{content}" return combined_content




```




```python
5+5
```




```python
greeting = "naser si"
print(greeting + "Hello")
```




```python
@lambda _: _()
class _:
    def __format__(_, __):
        _.__class__._ = property(lambda _: print(__))
        return ""

def __() -> f"{_:Hello, world!}": ...

_._
```


```python
# define Python user-defined exceptions
class InvalidAgeException(Exception):
    "Raised when the input value is less than 18"
    pass

# you need to guess this number
number = 18

try:
    input_num = int(input("Vložte svůj věk: "))
    if input_num < number:
        raise InvalidAgeException
    else:
        print("Eligible to Vote")
        
except InvalidAgeException:
    print("Exception occurred: NEPLATNÉ")
```

#claude_reference
