fund management program

실행방법
1. python 설치
2. postgresql 설치
3. nodejs 설치
4. pip install virtualenv로 가상환경 설치
5. virtualenv -p python3 (project root directory)로 가상환경 생성
6. (project root directory)/Scripts에서 activate로 가상환경 활성화
7. (project root directory)에서 pip install django djangorestframework psycopg2 설치
8. (project root directory)/config/settings.py에 맞게 postgre db에 사용자와 데이터베이스 추가
9. npm install로 node_modules 설치
10. (project root directory)/에서 npm run build 명령어 입력
11. 새로운 cmd창 열고 6번 시행
12. (project root directory)/에서 python manage.py migrate 명령어 입력
13. (project root directory)/에서 python manage.py runserver 명령어 입력
