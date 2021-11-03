"# crud_with_node_&_react" 


 # `POST/CREATE:` 
    - একদম সহজ ভাষায় যদি বলি ফ্রন্টএন্ড থেকে ডাটা নিয়ে সেটা পোস্ট করা হবে ব্যাকএন্ড এর কাছে ব্যাকএন্ড সেটা নিয়ে ডাটাবেস এ সেভ করবে।  


* একজন user ফর্ম এ ডাটা দিবে, সাবমিট করলে সেটা ব্যাকএন্ড এর url কল হবে।  

    - fetch('http://localhost:5000/add-users', { <br />
            method: 'POST', <br />
            headers: { <br />
                'content-type': 'application/json' <br />
            }, <br />
            body: JSON.stringify(newUser) <br />
        })

* ফ্রন্টএন্ড থেকে পাওয়া user এর ডাটা নিয়ে ডাটাবেস এর কাছে নির্দিষ্ট কালেকশন এ পাঠাবে।  ডাটাবেসে সেটা সেভ হবে।  

    - app.post('/add-users', async (req, res) => { <br />
        const newUser = req.body // receive data from frontend <br />
        const result = await usersCollection.insertOne(newUser); // save data to the database <br />
        res.send(result); // send response to the frontend. <br />
      }); <br />

* ব্যাকএন্ড থেকে ফ্রন্টএন্ড এর কাছে একটা রেসপন্স যাবে। 
* ফ্রন্টএন্ড থেকে কোনো সাকসেস মেসেজ দেখাবে। 
    - .then(res => res.json()) <br />
            .then(data => { <br />
                if (data.insertedId) { <br />
                    alert('Successfully added the user.') <br />
                    e.target.reset(); <br />
                }
            })


# `READ/GET` :  
    - ডাটাবেস থেকে কোনো ডাটা read করে সেটা ফ্রন্টএন্ড এ দেখানো।

* ফ্রন্টএন্ড এর যে পেজ এ  আমরা ডাটা দেখাবো সেই পেজ যখন লোড হবে তখন ই ব্যাকএন্ড এর কাছে url দিয়ে কল করা হবে।  
    - fetch(`http://localhost:5000/users`)
* আমরা যে ডাটাবেস কালেকশন এর ডাটা শো করবো সেই কালেকশন এ ডাটা ফাইন্ড করবো।  
    - app.get('/users', async (req, res) => { <br />
        const cursor = usersCollection.find({}); <br />
        const users = await cursor.toArray(); <br />
        
    });
* database কালেকশন এর ডাটা দিবে।  
* ব্যাকএন্ড সেই ডাটা নিয়ে ফ্রন্টএন্ড এ পাঠাবে।  
    - res.send( <br />
          users); <br />
* প্রাপ্ত ডাটা ফ্রন্টএন্ড এ শো করবো।  
    - .then(res => res.json()) <br />
            .then(data => { <br />
                setUsers(data.users)    <br />             
            }); <br />

    user.map(.............) <br />

# `UPDATE/PUT`
* ডাটাবেস এ থাকা কোনো ডাটা কে আপডেট করা

* এটি কিছুটা পোস্ট মেথড এর মতো।  ফ্রন্টএন্ড থেকে ডাটা নিয়ে ব্যাকএন্ড এর ইউআরএল কল করবে। তবে এখানে গুরুত্বপূর্ণ বিষয় হলো যে অবজেক্ট এর ডাটা আপডেট করতে চাই।  সেই অবজেক্ট ইউনিক id পাস করা। (চাইলে অন্য কোনো প্রপার্টি দিয়েও কাজটি করা যায়। )

    - const url = `http://localhost:5000/update-user/${userId}`; <br />
        fetch(url, { <br />
            method: 'PUT', <br />
            headers: {
                'content-type': 'application/json' <br />
            }, <br />
            body: JSON.stringify(user) <br />
        })

* ব্যাকএন্ড ওই ইউনিক Id আর ডাটা পাবে।  Id দিয়ে আমরা ফিল্টার করবো কোনো কালেকশন এর কোন অবজেক্ট এর ডাটা আপডেট করতে চাচ্ছি।  সেই কালেকশন এর কাছে ইউনিক Id আর নতুন ডাটা পাঠাবো।  
    - app.put('/update-user/:id', async (req, res) => { <br />
        const id = req.params.id; <br />
        console.log('updating', id) <br />
        const updatedUser = req.body; <br />
        const filter = { _id: ObjectId(id) }; // filtering user's object <br />
        const options = { upsert: true }; // update and insert <br />
        const updateDoc = { // set data <br />
            $set: { <br />
                fname: updatedUser.fname, <br />
                lname: updatedUser.lname, <br />
                address: updatedUser.address, <br />
                email: updatedUser.email <br />
            }, <br />
        }; <br />
        const result = await usersCollection.updateOne(filter, updateDoc, options) // updating  <br />
        res.json(result) // send response to frontend <br />

* ডাটাবেস এ ডাটা আপডেট হবে।  
* ব্যাকএন্ড থেকে ফ্রন্টএন্ড এ একটি রেসপন্স পাঠানো হবে।  
    - res.json(result) // send response to frontend <br />
* ফ্রন্টএন্ড এ সাকসেস মেসেজ দেখাবো।  
    - .then(res => res.json()) <br />
            .then(data => { <br />
                if (data.modifiedCount > 0) { <br />
                    alert('Update Successful'); <br />
                    setUser({}); <br />
                    e.target.reset(); <br />
                } <br />
            })

# `DELETE`
* ডাটাবেস এর কোনো ডাটা ডিলিট করা।  
* ফ্রন্টএন্ড এ ডিলিট বাটন এ ক্লিক করলে ডিলিট এর ইউআরএল কল হবে 
    - <button onClick={() => handleDeleteUser(user._id)} className="btn btn-danger" >delete</button>
* যে ডাটা ডিলিট করতে চাই তার ইউনিক Id পাঠাতে হবে যাতে করে আমরা কোয়েরি করে ডাটাবেস থেকে সেই নির্দিষ্ট ডাটা ডিলিট করতে পারি।  
    - const handleDeleteUser = id => { <br />
        const proceed = window.confirm('Are you sure, you want to delete?'); <br />
        if (proceed) { <br />
            const url = `http://localhost:5000/users/${id}`; <br />
            fetch(url, { <br />
                method: 'DELETE' <br />
            }) <br />

* ব্যাকএন্ড req.params.id থেকে একটা Id পাবে।  id  দিয়ে কোয়েরি করে ডাটাবেস এর যে  কালেকশন  এর ডাটা ডিলিট করতে চাই সেই কালেকশন এ কল দিবে। <br />
    - app.delete('/users/:id', async (req, res) => { <br />
        const id = req.params.id; <br />
        const query = { _id: ObjectId(id) }; <br />
        const result = await usersCollection.deleteOne(query); <br />
    }
* ডাটাবেস এ ঐ নির্দিষ্ট কালেকশন এ Id এর সাথে ম্যাচ করলে ডাটা ডিলিট করে দিবে।  
* ব্যাকএন্ড থেকে ফ্রন্টএন্ড এ একটি রেসপন্স পাঠানো হবে।  
    - res.json(result); <br />
* ফ্রন্টএন্ড এ সাকসেস মেসেজ দেখাবো।  
    - .then(res => res.json()) <br />
                .then(data => { <br />
                    if (data.deletedCount > 0) { <br />
                        alert('deleted successfully'); <br />
                    }