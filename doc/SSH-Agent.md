# Настройка SSH-Agent на Windows

Настройте SSH-Agent для работы с SSH-ключами на Windows, следуя этим шагам.

---

## 1. Запуск PowerShell от имени администратора

1. Нажмите `Win + S`, введите **PowerShell**, щёлкните правой кнопкой мыши и выберите **Запуск от имени администратора
   **.

---

## 2. Проверка статуса службы SSH-Agent

Введите следующую команду, чтобы проверить статус службы:

```bash
Get-Service ssh-agent
```

- **Результат:** Служба `ssh-agent` должна быть указана со статусом `Stopped` (Остановлено).

---

## 3. Установка режима запуска службы

Чтобы включить возможность запуска службы, выполните:

```bash
Set-Service ssh-agent -StartupType Manual
```

---

## 4. Запуск службы SSH-Agent

Теперь запустите службу:

```bash
Start-Service ssh-agent
```

---

## 5. Добавление SSH-ключа в агент

Добавьте ваш приватный ключ в SSH-Agent:

```bash
ssh-add C:\Users\<ВашПользователь>\.ssh\<ВашКлюч>
```

**Пример:**

```bash
ssh-add C:\Users\liber\.ssh\id_rsa_platina
```

- **Результат:** Успешное добавление ключа отобразит сообщение:

```
  Identity added: C:\Users\liber\.ssh\id_rsa_platina (platina-developer@yandex.ru)
```

---

## 6. Проверка загруженных ключей

Чтобы проверить, какие ключи загружены в агент, выполните:

```bash
ssh-add -l
```

- **Результат:** Отобразится список добавленных ключей.

---

## 7. Тестирование подключения

Проверьте SSH-подключение к GitHub:

```bash
ssh -T git@github.com
```

Если вы используете `Host` из файла конфигурации `.ssh/config`, выполните:

```bash
ssh -T github-platina
```

- **Ожидаемый результат:**

```
  Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

---

## 8. Автоматический запуск SSH-Agent (опционально)

Чтобы SSH-Agent запускался автоматически при загрузке системы, выполните:

```bash
Set-Service ssh-agent -StartupType Automatic
```

---

## Возможные ошибки и их решение

### 1. `Error connecting to agent: No such file or directory`

- Убедитесь, что служба `ssh-agent` запущена:

```bash
Start-Service ssh-agent
```

- Повторите добавление ключа с помощью команды `ssh-add`.

---

### 2. Служба SSH-Agent не запускается

Переустановите клиент OpenSSH:

```bash
Remove-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
```

---

### 3. Ошибка `Permission Denied (publickey)`

Убедитесь, что ваш публичный ключ (`id_rsa_platina.pub`) добавлен в GitHub:

1. Перейдите в **Настройки GitHub** → **SSH и GPG ключи** → **Новый SSH-ключ**.
2. Вставьте содержимое файла `.pub` и сохраните.

---

Теперь SSH-Agent настроен, и ключи готовы к использованию в Git!
