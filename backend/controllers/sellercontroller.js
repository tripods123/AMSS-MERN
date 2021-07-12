import express from 'express';
const app = express();
import { json } from 'body-parser';
import cors from 'cors';
import { MongoClient, ObjectId } from "mongodb";
import multer, { memoryStorage, MulterError } from 'multer';
import { verify } from 'jsonwebtoken';
const key='09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611';
import { storage as _storage } from "firebase/app";
import cookieParser from 'cookie-parser';
import { genSalt, hash as _hash } from 'bcryptjs';
import 'firebase/storage';
global.XMLHttpRequest=require('xhr2');
const upload = multer({storage:memoryStorage()}).single('image');
const storageRef = _storage().ref();
const saltRounds = 10;

app.use(cookieParser);
app.use(cors());
app.use(json());
export function create (req, res) {
        
    MongoClient.connect(process.env.MONGO_URI,{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        const db = client.db('amss');
        upload(req,res,function(err){
            if (err instanceof MulterError) {
                return res.send(err);
             } else if (err) {
                return res.send(err);
             }else{
                genSalt(saltRounds, function(err, salt) {
                    if(err)
                        return res.status(500).send(err);
                    _hash(req.body.password, salt, function(err, hash) { 
                        if(err)
                            return res.status(500).send(err);
                        const tobeinserted={
                            'ownername': req.body.ownername,
                            'shopname': req.body.shopname,
                            'username': req.body.username,
                            'address': req.body.address,
                            'state': req.body.state,
                            'city': req.body.city,
                            'gst': req.body.gstn,
                            'companycertificate': '',
                            'pincode': req.body.pincode,
                            'password': hash,
                            'email': req.body.email,
                            'phone': req.body.phone,
                            'isactive':0};
                        (async ()=>{
                            const isDuplicate =  await db.collection('seller').find({'username':req.body.username,'address':req.body.address}).toArray();
                            console.log(isDuplicate)
                            if(!isDuplicate[0]){
                                
                                const seller = await db.collection('seller').insertOne(tobeinserted);
                                if(seller.insertedCount===1){
                                        const uploadTask = storageRef.child('certificates/'+seller['insertedId']+'/documents/_'+Date.now()).put(req.file.buffer);
                                        uploadTask.on('state_changed', (snapshot) => {
                                            
                                        }, (error) => {
                                        }, () => {
                                            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                                                db.collection('seller').updateOne({'_id':ObjectId(seller['insertedId'])},{$set:{'company_registration_certificate':downloadURL}},(err, object)=> {
                                                    return res.status(200).send('done');
                                                });
                                            });
                                        });
                                    };
                                }else{
                                    return res.status(400).send('Seller already registered!');
                                }
                            })();
                        })
                    });
                }
            });
        });
}
export function available (req, res) {
    MongoClient.connect(process.env.MONGO_URI,{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        const db = client.db('amss');
        (async()=>{
            const seller = await db.collection('seller').find({ "username": req.params.username }, { $exists: true }).toArray();
            if(seller.length > 0){
                return res.status(200).send(false);
            }else{
                return res.status(200).send(true);
            }   
        })();
    });
}
export function isallowed (req, res) {
    const token = req.cookies.token;
    if(token){
        verify(token, key, (err, decoded) => {
            if (err) 
                return res.status(500).send('Internal Server error');
            if(decoded.type==='seller'){
                return res.status(200).send(true);
            }else{
                return res.status(200).send(false);
            }
        });
    }else{
        return res.status(401).send(false);
    }
}

export function statescities (res) {
    MongoClient.connect(process.env.MONGO_URI,{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        const db = client.db('amss');
        (async ()=> {
            const statescities =  await db.collection('StatesCities').find().toArray(); 
            if(statescities.length>0){
                return res.status(200).send(statescities);
            }else{
                return res.status(200).send([]);
            }
        })();
    });
}