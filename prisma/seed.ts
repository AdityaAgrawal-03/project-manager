import { db } from "src/lib/db";
import { TASK_STATUS } from "prisma/prisma-client/index";

const randomTaskStatus = () => {
  const status = [
    TASK_STATUS.PRIORITIZED,
    TASK_STATUS.ONGOING,
    TASK_STATUS.COMPLETED,
    TASK_STATUS.RELEASED,
  ];
  return status[Math.floor(Math.random() * status.length)];
};

async function main() {
  const user = await db.user.upsert({
    where: { email: "aditya@gmail.com" },
    create: {
      firstName: "aditya",
      lastName: "agrawal",
      email: "aditya@gmail.com",
      password: "password",
      projects: {
        create: new Array(5).fill(1).map((_, i) => ({
          name: `project ${i}`,
          estimate: new Date(2023, 5, 30)
        }))
      }
    },
    update: {},
    include: {
      projects: true
    }
  });

  const tasks = await Promise.all(
    user.projects.map((project) =>
      db.task.createMany({
        data: new Array(10).fill(1).map((_, i) => ({
          name: `Task ${i}`,
          status: randomTaskStatus(),
          description: `Description for task ${i} for project ${project.id}`,
          estimate: new Date(2023, 5, 30),
          ownerId: user.id,
          projectId: project.id,
        })),
      })
    )
  );

  console.log(user, tasks);
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
