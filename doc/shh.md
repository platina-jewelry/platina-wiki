# Настройка SSH для работы с несколькими аккаунтами GitHub и SSH-Agent на Windows

Эта инструкция поможет настроить SSH-доступ для нескольких аккаунтов GitHub и включить поддержку SSH-Agent на Windows.

## Шаг 1: Создание SSH-ключей

Если ключи уже существуют, переходите к Шагу 2.

1. Откройте PowerShell или Git Bash.
2. Сгенерируйте SSH-ключи для каждого аккаунта:

 ```
   ssh-keygen -t rsa -b 4096 -C "email@example.com" -f ~/.ssh/id_rsa_platina
   ssh-keygen -t rsa -b 4096 -C "email@example.com" -f ~/.ssh/id_rsa_sergey
 ```

3. Сохраните ключи в папке `~/.ssh`. Укажите пароль для ключей, если потребуется.

## Шаг 2: Добавление SSH-ключей в GitHub

1. Откройте файл публичного ключа:

 ```
   cat ~/.ssh/id_rsa_platina.pub
   cat ~/.ssh/id_rsa_sergey.pub
 ```

2. Скопируйте содержимое файла.
3. Перейдите в [настройки SSH GitHub](https://github.com/settings/keys) и добавьте ключ для каждого аккаунта.

## Шаг 3: Настройка файла конфигурации SSH

1. Создайте или откройте файл конфигурации SSH:

 ```
   nano ~/.ssh/config
 ```

2. Добавьте следующие настройки:

 ```
   # Первый аккаунт
   Host github-platina
   HostName github.com
   User git
   IdentityFile ~/.ssh/id_rsa_platina

   # Второй аккаунт
   Host github-sergey
   HostName github.com
   User git
   IdentityFile ~/.ssh/id_rsa_sergey
 ```

3. Сохраните файл и закройте редактор.

## Шаг 4: Настройка SSH-Agent на Windows

1. Запустите PowerShell от имени администратора.
2. Проверьте статус службы SSH-Agent:

 ```
   Get-Service ssh-agent
 ```

- Если статус службы `Stopped`, выполните команду:

  ```
    Set-Service ssh-agent -StartupType Manual
    Start-Service ssh-agent
  ```

3. Добавьте SSH-ключи в агент:

 ```
   ssh-add C:/Users/<ВашПользователь>/.ssh/id_rsa_platina
   ssh-add C:/Users/<ВашПользователь>/.ssh/id_rsa_sergey
 ```

4. Проверьте, что ключи добавлены:

 ```
   ssh-add -l
 ```

## Шаг 5: Проверка SSH-подключения

1. Проверьте подключение к GitHub для каждого аккаунта:

 ```
   ssh -T github-platina
   ssh -T github-sergey
 ```

2. Убедитесь, что видите сообщение:

 ```
   Hi username! You've successfully authenticated, but GitHub does not provide shell access.
 ```

## Шаг 6: Настройка `git remote`

1. Перейдите в папку проекта:

 ```
   cd path/to/project
 ```

2. Укажите правильный `remote`:

 ```
   git remote set-url origin github-platina:platina-jewelry/platina-wiki.git
 ```

3. Проверьте:

 ```
   git remote -v
 ```

- Ожидаемый результат:

  ```
    origin  github-platina:platina-jewelry/platina-wiki.git (fetch)
    origin  github-platina:platina-jewelry/platina-wiki.git (push)
  ```

## Шаг 7: Использование Git

Теперь можно выполнять команды `git pull` и `git push`:
'''
git pull
git push
'''

## Шаг 8: Автоматический запуск SSH-Agent (опционально)

Чтобы SSH-Agent запускался автоматически при загрузке системы, выполните:
'''
Set-Service ssh-agent -StartupType Automatic
'''

## Возможные ошибки и их решение

### 1. `Permission denied (publickey)`

- Проверьте, что ключ добавлен в агент:

```
  ssh-add -l
```

- Убедитесь, что публичный ключ добавлен в настройки GitHub.

### 2. Ошибка `No such file or directory`

- Убедитесь, что путь к ключу указан правильно:

```
  ssh-add C:/Users/<ВашПользователь>/.ssh/id_rsa_<ВашКлюч>
```

### 3. Служба SSH-Agent не запускается

- Переустановите клиент OpenSSH:

```
  Remove-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
  Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
```

Теперь ваш SSH доступ настроен и готов к использованию!
