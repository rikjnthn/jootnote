/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const snapshot = [
    {
      "id": "_pb_users_auth_",
      "created": "2024-09-13 10:43:52.710Z",
      "updated": "2024-09-14 02:37:59.067Z",
      "name": "users",
      "type": "auth",
      "system": false,
      "schema": [],
      "indexes": [],
      "listRule": null,
      "viewRule": "id = @request.auth.id",
      "createRule": "",
      "updateRule": "id = @request.auth.id",
      "deleteRule": "id = @request.auth.id",
      "options": {
        "allowEmailAuth": true,
        "allowOAuth2Auth": true,
        "allowUsernameAuth": true,
        "exceptEmailDomains": null,
        "manageRule": null,
        "minPasswordLength": 8,
        "onlyEmailDomains": null,
        "onlyVerified": false,
        "requireEmail": false
      }
    },
    {
      "id": "h54z1eochn9iy0d",
      "created": "2024-09-13 10:48:26.112Z",
      "updated": "2024-09-21 10:57:31.980Z",
      "name": "folders",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "242nq9yn",
          "name": "name",
          "type": "text",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": 256,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "sjo3qjc8",
          "name": "user",
          "type": "relation",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        }
      ],
      "indexes": [
        "CREATE UNIQUE INDEX `idx_QANW4Se` ON `folders` (\n  `name`,\n  `user`\n)"
      ],
      "listRule": "@request.auth.id != \"\"",
      "viewRule": "@request.auth.id != \"\"",
      "createRule": "@request.auth.id != \"\"",
      "updateRule": "@request.auth.id != \"\"",
      "deleteRule": "@request.auth.id != \"\"",
      "options": {}
    },
    {
      "id": "zif7y0g97tx8hzb",
      "created": "2024-09-13 10:49:18.451Z",
      "updated": "2024-09-18 12:39:05.944Z",
      "name": "files",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "wk1d41dr",
          "name": "name",
          "type": "text",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": 256,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "tsdbsm03",
          "name": "folder",
          "type": "relation",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "h54z1eochn9iy0d",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        }
      ],
      "indexes": [
        "CREATE UNIQUE INDEX `idx_qRzfogw` ON `files` (\n  `name`,\n  `folder`\n)"
      ],
      "listRule": "@request.auth.id != \"\"",
      "viewRule": "@request.auth.id != \"\"",
      "createRule": "@request.auth.id != \"\"",
      "updateRule": "@request.auth.id != \"\"",
      "deleteRule": "@request.auth.id != \"\"",
      "options": {}
    },
    {
      "id": "080mdpliydg3vd8",
      "created": "2024-09-14 08:51:04.549Z",
      "updated": "2024-09-15 04:25:23.776Z",
      "name": "contents",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "pllkgqga",
          "name": "title",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "ee9mobyn",
          "name": "content",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "25xid8wp",
          "name": "file",
          "type": "relation",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "zif7y0g97tx8hzb",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        }
      ],
      "indexes": [
        "CREATE UNIQUE INDEX `idx_5pQGZqs` ON `contents` (`file`)"
      ],
      "listRule": "@request.auth.id != \"\"",
      "viewRule": "@request.auth.id != \"\"",
      "createRule": "@request.auth.id != \"\"",
      "updateRule": "@request.auth.id != \"\"",
      "deleteRule": "@request.auth.id != \"\"",
      "options": {}
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})
