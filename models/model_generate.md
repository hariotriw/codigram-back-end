#

## Command geerate model

<!-- Start of Bash -->

```bash
# User
    npx sequelize-cli model:generate --name User --attributes uuid:string,username:string,email:string,password:string,fullname:string,avatar:string,status:integer

# Post
    npx sequelize-cli model:generate --name Post --attributes strId:string,UserId:integer,caption:string,image:string

# Comment
    npx sequelize-cli model:generate --name Comment --attributes strId:string,UserId:integer,PostId:integer,comment:string

# Like
    npx sequelize-cli model:generate --name Like --attributes strId:string,UserId:integer,PostId:integer

```

<!-- End of Bash -->
