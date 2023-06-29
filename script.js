const roles = {
	admin: "https://cdn-icons-png.flaticon.com/512/149/149452.png",
	student: "https://cdn-icons-png.flaticon.com/512/149/149452.png",
	lector: "https://cdn-icons-png.flaticon.com/512/149/149452.png"
  };
  
  const gradation = {
	20: "satisfactory",
	55: "good",
	85: "very-good",
	100: "excellent"
  };
  
  const users = [
	{
	  name: "Jack Smith",
	  age: 23,
	  img: "https://cdn-icons-png.flaticon.com/512/149/149452.png",
	  role: "student",
	  courses: [
		{
		  title: "Front-end Pro",
		  mark: 20
		},
		{
		  title: "Java Enterprise",
		  mark: 100
		}
	  ]
	},
	{
	  name: "Amal Smith",
	  age: 20,
	  img: "https://cdn-icons-png.flaticon.com/512/149/149452.png",
	  role: "student"
	},
	{
	  name: "Noah Smith",
	  age: 43,
	  img: "https://cdn-icons-png.flaticon.com/512/149/149452.png",
	  role: "student",
	  courses: [
		{
		  title: "Front-end Pro",
		  mark: 50
		}
	  ]
	},
	{
	  name: "Charlie Smith",
	  age: 18,
	  img: "https://cdn-icons-png.flaticon.com/512/149/149452.png",
	  role: "student",
	  courses: [
		{
		  title: "Front-end Pro",
		  mark: 75
		},
		{
		  title: "Java Enterprise",
		  mark: 23
		}
	  ]
	},
	{
	  name: "Emily Smith",
	  age: 30,
	  img: "https://cdn-icons-png.flaticon.com/512/149/149452.png",
	  role: "admin",
	  courses: [
		{
		  title: "Front-end Pro",
		  score: 10,
		  lector: "Leo Smith"
		},
		{
		  title: "Java Enterprise",
		  score: 50,
		  lector: "David Smith"
		},
		{
		  title: "QA",
		  score: 75,
		  lector: "Emilie Smith"
		}
	  ]
	},
	{
	  name: "Leo Smith",
	  age: 25,
	  img: "https://cdn-icons-png.flaticon.com/512/149/149452.png",
	  role: "lector",
	  courses: [
		{
		  title: "Front-end Pro",
		  score: 78,
		  studentsScore: 79
		},
		{
		  title: "Java Enterprise",
		  score: 85,
		  studentsScore: 85
		}
	  ]
	}
  ];
  
  class Users {
	constructor(users) {
	  this.users = users;
	}
  
	render(user) {
	  const userString = `
		<div class="user">
		  <div class="user__info">
			<div class="user__info--data">
			  <img src="${user.img}" alt="${user.name}" height="50">
			  <div class="user__naming">
				<p>Name: <b>${user.name}</b></p>
				<p>Age: <b>${user.age}</b></p>
			  </div>
			</div>
			<div class="user__info--role ${user.role}">
			  <img src="${roles[user.role]}" alt="${user.role}" height="25">
			  <p>${user.role}</p>
			</div>
		  </div>
		  ${this.renderCourses(user)}
		</div>`;
	  return document.write(userString);
	}
  
	renderCourses(user) {
	  if (user.courses) {
		const coursesString = `
		  <div class="user__courses">
			${user.courses
			  .map((course) => {
				const mark = course.mark || course.score;
  
				let graduationLevel = "";
				for (const key in gradation) {
				  if (mark >= key) {
					graduationLevel = gradation[key];
				  }
				}
				return `
				  <p class="user__courses--course ${user.role}">
					${course.title} <span class="${graduationLevel}">${graduationLevel}</span>
				  </p>`;
			  })
			  .join("")}
		  </div>`;
		return coursesString;
	  }
	  return "";
	}
  
	renderAll() {
	  document.write('<div class="users">');
	  this.users.forEach((user) => {
		const userString = this.render(user);
		document.write(userString);
	  });
	  document.write('</div>');
	}
  }
  
  class Student extends Users {
	constructor(users) {
	  super(users);
	}
  
	renderAll() {
	  super.renderAll();
	}
  }
  
  class Admin extends Users {
	constructor(users) {
	  super(users);
	}
  
	renderCourses(user) {
	  if (user.courses) {
		const coursesString = `
		  <div class="user__courses admin--info">
			${user.courses
			  .map((course) => {
				let mark = course.mark || course.score;
  
				let graduationLevel = "";
				for (const key in gradation) {
				  if (mark >= key) {
					graduationLevel = gradation[key];
				  }
				}
				let lector = "";
				for (const user of users) {
				  if (user.role === "lector" && user.name === course.lector) {
					lector = user.name;
					break;
				  }
				}
				return `
				  <div class="user__courses--course ${user.role}">
					<p>Title: <b>${course.title}</b></p>
					<p>Admin's score: <span class="${graduationLevel}">${graduationLevel}</span></p>
					<p>Lector: <b>${lector}</b></p>
				  </div>`;
			  })
			  .join("")}
		  </div>`;
		return coursesString;
	  }
	  return "";
	}
  
	renderAll() {
	  super.renderAll();
	}
  }
  
  class Lector extends Users {
	constructor(users) {
	  super(users);
	}
  
	renderCourses(user) {
	  if (user.courses) {
		const coursesString = `
		  <div class="user__courses admin--info">
			${user.courses
			  .map((course) => {
				let mark = course.mark || course.score;
				let graduationLevel = "";
				for (const key in gradation) {
				  if (mark >= key) {
					graduationLevel = gradation[key];
				  }
				}
				let studentsScore = "";
				if (course.studentsScore) {
				  const studentsMark = course.studentsScore;
				  for (const key in gradation) {
					if (studentsMark >= key) {
					  studentsScore = gradation[key];
					}
				  }
				}
				return `
				  <div class="user__courses--course ${user.role}">
					<p>Title: <b>${course.title}</b></p>
					<p>Lector's score: <span class="${graduationLevel}">${graduationLevel}</span></p>
					${studentsScore ? `<p>Average student's score: <span class="${studentsScore}">${studentsScore}</span></p>` : ''}
				  </div>`;
			  })
			  .join("")}
		  </div>`;
		return coursesString;
	  }
	  return "";
	}
  
	renderAll() {
	  super.renderAll();
	}
  }
  
  const student = users.filter((user) => {
	return user.role == 'student';
  });
  
  const admins = users.filter((user) => {
	return user.role == 'admin';
  });
  
  const lectors = users.filter((user) => {
	return user.role == 'lector';
  });
  
  const studentForRender = new Student(student);
  studentForRender.renderAll();
  
  const lectorsForRender = new Lector(lectors);
  lectorsForRender.renderAll();
  
  const adminForRender = new Admin(admins);
  adminForRender.renderAll();
  