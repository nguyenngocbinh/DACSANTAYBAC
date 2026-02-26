# 🚀 GitLab CI/CD Setup

## 🎯 Mục Đích
Cấu hình GitLab CI/CD để tự động mirror code từ GitLab (private) sang GitHub (public), giúp GitHub Pages luôn cập nhật.

> **Lưu ý:** Hiện tại dự án đang push trực tiếp lên GitHub. GitLab CI/CD là phương thức phụ/backup.

## ⚡ Workflow

### Push trực tiếp (Phương thức chính):
```bash
git push origin main       # origin = GitHub
```

### Push qua GitLab (Tùy chọn):
```bash
git push gitlab main       # Trigger CI/CD → auto mirror sang GitHub
```

## 🔧 Cấu Hình

### 1. Thêm GitLab remote (nếu chưa có):
```bash
git remote add gitlab https://gitlab.com/nguyenngocbinh/DACSANTAYBAC.git
```

### 2. Tạo GitLab Personal Access Token
1. Truy cập: https://gitlab.com/-/user_settings/personal_access_tokens
2. **Token name:** `DACSANTAYBAC-deploy`
3. **Scopes:** ✅ `read_repository`, ✅ `write_repository`
4. Click **Create** → copy token

### 3. Tạo GitHub Personal Access Token
1. Truy cập: https://github.com/settings/tokens
2. **Scopes:** ✅ `repo`
3. Click **Generate** → copy token

### 4. Cấu hình biến môi trường trên GitLab
Vào **Settings > CI/CD > Variables** trên GitLab repo:

| Variable | Giá trị | Protected | Masked |
|----------|---------|-----------|--------|
| `GITHUB_TOKEN` | GitHub PAT | ✅ | ✅ |
| `GITLAB_PERSONAL_ACCESS_TOKEN` | GitLab PAT | ✅ | ✅ |

### 5. File `.gitlab-ci.yml` (đã có sẵn):
```yaml
stages:
  - deploy

deploy_to_github:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache git
  script:
    - git config --global http.postBuffer 524288000
    - git config --global user.email "nguyenngocbinhneu@gmail.com"
    - git config --global user.name "Nguyen Ngoc Binh"
    - git clone --mirror https://oauth2:$GITLAB_PERSONAL_ACCESS_TOKEN@gitlab.com/nguyenngocbinh/DACSANTAYBAC.git
    - cd DACSANTAYBAC.git
    - git remote add github https://$GITHUB_TOKEN@github.com/nguyenngocbinh/DACSANTAYBAC.git
    - git push --mirror github
  only:
    - main
```

## 📊 Dual Repository Strategy

| Repository | Quyền truy cập | Mục đích |
|-----------|----------------|----------|
| **GitLab** `gitlab.com/nguyenngocbinh/DACSANTAYBAC` | Private | Source backup, CI/CD trigger |
| **GitHub** `github.com/nguyenngocbinh/DACSANTAYBAC` | Public | GitHub Pages hosting, production |

## 🛡️ Bảo Mật
- CI/CD tokens được lưu trong GitLab Variables (encrypted)
- GitLab repo private — chỉ owner truy cập
- GitHub repo public — code hiển thị, mật khẩu admin đã hash SHA-256

---
*Cập nhật: 26/02/2026*
