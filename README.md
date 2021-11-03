"# crud_with_node_&_react" 


 # `POST/CREATE:` 
    - একদম সহজ ভাষায় যদি বলি ফ্রন্টএন্ড থেকে ডাটা নিয়ে সেটা পোস্ট করা হবে ব্যাকএন্ড এর কাছে ব্যাকএন্ড সেটা নিয়ে ডাটাবেস এ সেভ করবে।  


* একজন user ফর্ম এ ডাটা দিবে, সাবমিট করলে সেটা ব্যাকএন্ড এর url কল হবে।  

    - fetch('http://localhost:5000/add-users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })

* ফ্রন্টএন্ড থেকে পাওয়া user এর ডাটা নিয়ে ডাটাবেস এর কাছে নির্দিষ্ট কালেকশন এ পাঠাবে।  ডাটাবেসে সেটা সেভ হবে।  

    - app.post('/add-users', async (req, res) => {
        const newUser = req.body // receive data from frontend
        const result = await usersCollection.insertOne(newUser); // save data to the database
        res.send(result); // send response to the frontend.
      });

* ব্যাকএন্ড থেকে ফ্রন্টএন্ড এর কাছে একটা রেসপন্স যাবে। 
* ফ্রন্টএন্ড থেকে কোনো সাকসেস মেসেজ দেখাবে। 
    - .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Successfully added the user.')
                    e.target.reset();
                }
            })


# `READ/GET` :  
    - ডাটাবেস থেকে কোনো ডাটা read করে সেটা ফ্রন্টএন্ড এ দেখানো।

* ফ্রন্টএন্ড এর যে পেজ এ  আমরা ডাটা দেখাবো সেই পেজ যখন লোড হবে তখন ই ব্যাকএন্ড এর কাছে url দিয়ে কল করা হবে।  
    - fetch(`http://localhost:5000/users`)
* আমরা যে ডাটাবেস কালেকশন এর ডাটা শো করবো সেই কালেকশন এ ডাটা ফাইন্ড করবো।  
    - app.get('/users', async (req, res) => {
        const cursor = usersCollection.find({});
        const users = await cursor.toArray();
        
    });
* database কালেকশন এর ডাটা দিবে।  
* ব্যাকএন্ড সেই ডাটা নিয়ে ফ্রন্টএন্ড এ পাঠাবে।  
    - res.send(
          users);
* প্রাপ্ত ডাটা ফ্রন্টএন্ড এ শো করবো।  
    - .then(res => res.json())
            .then(data => {
                setUsers(data.users)                
            });

    user.map(.............)

# `UPDATE/PUT`
* ডাটাবেস এ থাকা কোনো ডাটা কে আপডেট করা

* এটি কিছুটা পোস্ট মেথড এর মতো।  ফ্রন্টএন্ড থেকে ডাটা নিয়ে ব্যাকএন্ড এর ইউআরএল কল করবে। তবে এখানে গুরুত্বপূর্ণ বিষয় হলো যে অবজেক্ট এর ডাটা আপডেট করতে চাই।  সেই অবজেক্ট ইউনিক id পাস করা। (চাইলে অন্য কোনো প্রপার্টি দিয়েও কাজটি করা যায়। )

    - const url = `http://localhost:5000/update-user/${userId}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })

* ব্যাকএন্ড ওই ইউনিক Id আর ডাটা পাবে।  Id দিয়ে আমরা ফিল্টার করবো কোনো কালেকশন এর কোন অবজেক্ট এর ডাটা আপডেট করতে চাচ্ছি।  সেই কালেকশন এর কাছে ইউনিক Id আর নতুন ডাটা পাঠাবো।  
    - app.put('/update-user/:id', async (req, res) => {
        const id = req.params.id;
        console.log('updating', id)
        const updatedUser = req.body;
        const filter = { _id: ObjectId(id) }; // filtering user's object
        const options = { upsert: true }; // update and insert
        const updateDoc = { // set data
            $set: {
                fname: updatedUser.fname,
                lname: updatedUser.lname,
                address: updatedUser.address,
                email: updatedUser.email
            },
        };
        const result = await usersCollection.updateOne(filter, updateDoc, options) // updating 
        res.json(result) // send response to frontend

* ডাটাবেস এ ডাটা আপডেট হবে।  
* ব্যাকএন্ড থেকে ফ্রন্টএন্ড এ একটি রেসপন্স পাঠানো হবে।  
    - res.json(result) // send response to frontend
* ফ্রন্টএন্ড এ সাকসেস মেসেজ দেখাবো।  
    - .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Update Successful');
                    setUser({});
                    e.target.reset();
                }
            })

# `DELETE`
* ডাটাবেস এর কোনো ডাটা ডিলিট করা।  
* ফ্রন্টএন্ড এ ডিলিট বাটন এ ক্লিক করলে ডিলিট এর ইউআরএল কল হবে 
    - <button onClick={() => handleDeleteUser(user._id)} className="btn btn-danger" >delete</button>
* যে ডাটা ডিলিট করতে চাই তার ইউনিক Id পাঠাতে হবে যাতে করে আমরা কোয়েরি করে ডাটাবেস থেকে সেই নির্দিষ্ট ডাটা ডিলিট করতে পারি।  
    - const handleDeleteUser = id => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            const url = `http://localhost:5000/users/${id}`;
            fetch(url, {
                method: 'DELETE'
            })

* ব্যাকএন্ড req.params.id থেকে একটা Id পাবে।  id  দিয়ে কোয়েরি করে ডাটাবেস এর যে  কালেকশন  এর ডাটা ডিলিট করতে চাই সেই কালেকশন এ কল দিবে।
    - app.delete('/users/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await usersCollection.deleteOne(query);
    }
* ডাটাবেস এ ঐ নির্দিষ্ট কালেকশন এ Id এর সাথে ম্যাচ করলে ডাটা ডিলিট করে দিবে।  
* ব্যাকএন্ড থেকে ফ্রন্টএন্ড এ একটি রেসপন্স পাঠানো হবে।  
    - res.json(result);
* ফ্রন্টএন্ড এ সাকসেস মেসেজ দেখাবো।  
    - .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('deleted successfully');
                    }