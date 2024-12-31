let status = {
	1: "one",
	2: "two",
	3: "three",
	4: "four",
};

function saveUsersToLocalStorage()
{
	localStorage.setItem('users',JSON.stringify(users_json));
}

function loadUsersFromLocalStorage()
{
	const users = localStorage.getItem('users');
	if(users)
		{
			users_json=JSON.parse(users);
		}
}

let users_json = [
	{
		userId: 1,
		name: "Jon Snow",
		profilePicture:"https://cg0.cgsociety.org/uploads/images/original/hosseindiba-jon-snow-1-b968195d-au6q.jpeg",
		statusMessage: "We become what we think about!",
		presence: 1,
	},
	{
		userId: 2,
		name: "Daenerys Targaryen",
		profilePicture:"https://preview.redd.it/hlxen8gtwpm01.jpg?width=640&crop=smart&auto=webp&v=enabled&s=a3c43bcbfc1db31d542ef67071559264358b3d2b",
		statusMessage: "A positive mindset brings positivethings.",
		presence: 3,
	},
	{
		userId: 3,
		name: "Tyrion Lannister",
		profilePicture:"https://mir-s3-cdn-cf.behance.net/project_modules/fs/6a3f5237411193.573f25019c8bf.jpg",
		statusMessage: "One small positive thought can change your whole day",
		presence: 3,
	},
	{
		userId: 4,
		name: "Jaime Lannister",
		profilePicture:"https://images.nightcafe.studio/jobs/mWfF1s7OOVg5DMTYiNZ8/mWfF1s7OOVg5DMTYiNZ8--4--qccau.jpg?tr=w-1600,c-at_max",
		statusMessage: "I am a rockstar",
		presence: 1,
	},
	{
		userId: 5,
		name: "Arya Stark",
		profilePicture:"https://64.media.tumblr.com/21de4501827aba1c6463ce2ae6a36780/tumblr_ps5le9xxRb1w9a5vgo1_1280.jpg",
		statusMessage: "I am using Gradious messenger",
		presence: 4,
}
];

loadUsersFromLocalStorage();

let updateMode = false;
let currentUserId = null;

function display(){
	const root =  document.getElementById('root');
	root.innerHTML = '';
	users_json.forEach(user=>{
		const userElement = document.createElement('div');
		userElement.classList.add('user');

		const imgContainer = document.createElement('div');
		imgContainer.classList.add('img-container');

		const img =document.createElement('img');
		img.src = user.profilePicture;
		img.alt="user image";
		img.classList.add('user-image',status[user.presence]);

		imgContainer.appendChild(img);

		const userDetail = document.createElement('div');
		userDetail.classList.add('user-detail');

		const userName = document.createElement('p');
		userName.classList.add('user-name');
		userName.innerText=user.name;

		const userMessage = document.createElement('p');
		userMessage.classList.add('user-message');
		userMessage.innerText = user.statusMessage;

		userDetail.appendChild(userName);
		userDetail.appendChild(userMessage);

		const threeBtn = document.createElement('div');
		threeBtn.classList.add('three-btn');

		const dropdown = document.createElement('div');
		dropdown.classList.add('dropdown');

		const dropdownToggle = document.createElement('a');
		dropdownToggle.href="#";
		dropdownToggle.role="button";
		dropdownToggle.dataset.bsToggle = "dropdown";
		dropdownToggle.ariaExpanded = "false";
		dropdownToggle.innerHTML = '<i class="bi bi-three-dots-vertical"></i>';

		const dropdownMenu = document.createElement('ul');
		dropdownMenu.classList.add('dropdown-menu');

		const deleteButton = document.createElement('button');
		deleteButton.id=user.userId;
		deleteButton.classList.add('dropdown-item');
		deleteButton.innerText = 'Delete';
		deleteButton.onclick = () => deleteItem(user.userId);

		const updateButton = document.createElement('button');
		updateButton.id = 'update-' + user.userId;
		updateButton.classList.add('dropdown-item');
		updateButton.innerText = 'Update';
		updateButton.onclick = () =>{
			updateMode = true;
			currentUserId = user.userId;
			populateFormForUpdate(user);
		};

		const deleteLi = document.createElement('li');
		deleteLi.appendChild(deleteButton);
		const updateLi=document.createElement('li');
		updateLi.appendChild(updateButton);

		dropdownMenu.appendChild(deleteLi);
		dropdownMenu.appendChild(updateLi);

		dropdown.appendChild(dropdownToggle);
		dropdown.appendChild(dropdownMenu);

		threeBtn.appendChild(dropdown);

		userElement.appendChild(imgContainer);
		userElement.appendChild(userDetail);
		userElement.appendChild(threeBtn);

		root.appendChild(userElement);
	});
}

function addUser(){
	if(updateMode)
		{
			updateUser();
		}
		else
		{
			const name= document.getElementById('name').value;
			const statusMessage = document.getElementById('statusMessage').value;
			const profilePicture = document.getElementById('profilePicLink').value;
			const presence = document.getElementById('presence').value; 

			const newUser={
				userId:Date.now().toString(),
				name,
				profilePicture,
				statusMessage,
				presence:parseInt(presence)
			};

			users_json.unshift(newUser);
			saveUsersToLocalStorage();
			display();
			resetForm();
			document.getElementById('addUserForm').style.display = 'none';
		}
}

function updateUser(){
	const user = users_json.find(user => user.userId == currentUserId);
	if(user)
		{
			user.name = document.getElementById('name').value;
			user.statusMessage = document.getElementById('statusMessage').value;
			user.profilePicture = document.getElementById('profilePicLink').value;
			user.presence = parseInt(document.getElementById('presence').value); 
			saveUsersToLocalStorage();
			display();
			resetForm();
			updateMode = false;
			currentUserId = null;
			document.getElementById('addUserForm').style.display = 'none';
		}
}

function deleteItem(userId){
	users_json = users_json.filter(user => user.userId!=userId);
	saveUsersToLocalStorage();
	display(); 
}

function populateFormForUpdate(user){
	document.getElementById('name').value = user.name;
	document.getElementById('statusMessage').value = user.statusMessage;
	document.getElementById('profilePicLink').value = user.profilePicture ;
	document.getElementById('presence').value = user.presence; 
	document.getElementById('addUserForm').style.display = 'block';

	const addButton = document.querySelector('#addUserForm button');
	addButton.innerText = 'Update Details';

	updateMode = true;
}

function resetForm(){
	document.getElementById('name').value = '';
	document.getElementById('statusMessage').value = '';
	document.getElementById('profilePicLink').value = '';
	document.getElementById('presence').value = '1';
}

function visibleUserForm(){
	resetForm();
	updateMode = false;
	currentUserId = null;
	document.getElementById('addUserForm').style.display = 'block';
}

document.addEventListener('DOMContentLoaded',display);