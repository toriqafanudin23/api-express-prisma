# api-express-prisma

npm init -y
npm install express prisma cors dotenv
npm install @prisma/client
npx prisma init
DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb?schema=public"
npx prisma migrate dev --name init
npx prisma generate
