# Useful Bookmarks

## What's this?

Một danh sách các đoạn code ngắn gọn nhưng hữu ích, chỉ cần tạo bookmark trên trình duyệt rồi copy paste đoạn code vào là dùng được ngay. 🙂

## How's it work?

### 1. Remove SmileFace

> **Remove Smile-Face** from facebook message with ONE click 🙂
> Xoá hết cmn luôn các kí tự cười trong tin nhắn facebook với 1 click 🙂

```text
    javascript:(function(){let chars='🙂,🙃';if(window.confirm('Xoá hết cmn luôn các kí tự cười ' + chars + ' trong tin nhắn fb !!')) Array.from(document.getElementsByTagName('img')).forEach(img => {if(chars.split(',').indexOf(img.alt) != -1) img.style.display="none"})}())
```

> **Toggle all message tabs in Facebook**
> Ẩn / Hiện tất cả các ô tin nhắn trong facebook

```text
    javascript:(function(){Array.from(document.getElementsByClassName('_69pt')).forEach(ele => ele.click())})()
```
