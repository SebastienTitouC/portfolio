import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.join(__filename, '..'));
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
class Articles {
    supabase;
    constructor() {
        if (supabaseUrl && supabaseKey)
            this.supabase = createClient(supabaseUrl, supabaseKey);
        else
            throw ("Problème d'ouverture de la database");
    }
    async createArticles(article) {
        if (!article.title || !article.content || !article.category) {
            throw ('Title, content and category are required');
        }
        const { error } = await this.supabase.from('articles').insert({
            title: article.title,
            content: article.content,
            category: article.category
        });
        if (error) {
            throw (`'Erreur:' ${{ error }}`);
        }
        return article;
    }
    async readArticles(categoryFilter) {
        let response;
        if (categoryFilter === '*') {
            response = await this.supabase.from('articles').select();
        }
        else {
            response = await this.supabase.from('articles').select().eq('category', categoryFilter);
        }
        const { data, error } = response;
        if (error) {
            throw (`'Erreur:' ${{ error }}`);
        }
        return data;
    }
    async readOneArticle(id) {
        const { data, error } = await this.supabase.from('articles').select().eq('id', id);
        if (error) {
            throw (`'Erreur:' ${{ error }}`);
        }
        return data;
    }
    async updateArticle(id, article) {
        const { error } = await this.supabase.from('articles').update({
            title: article.title,
            content: article.content,
            category: article.category
        }).eq('id', id);
        if (error) {
            throw (`'Erreur:' ${{ error }}`);
        }
    }
    async deleteArticle(id) {
        const response = await this.supabase.from('articles').delete().eq('id', 1);
        return response;
    }
}
/*
# CRUD interface

## Routes
 - Create:      POST    /api/items
 - Read all:    GET     /api/items
 - Read:        GET     /api/items/1
 - Update:      PUT     /api/items/1
 - Delete:      DELETE  /api/items/1
 
## Responses
    res.status(200) // Ok
    res.status(201) // Created
    res.status(204) // No content
    res.status(400) // Bad request
    res.status(401) // Unauthorized
    res.status(403) // Forbidden
    res.status(404) // Not found
    res.status(500) // Server error
*/
export class ItemController {
    app;
    items;
    constructor(app) {
        this.app = app;
        this.items = new Articles();
        // All needed routes for CRUD
        this.app.post('/api/items', (req, res) => this.createCallback(req, res));
        this.app.get('/api/items', (req, res) => this.readCallback(req, res));
        this.app.get('/api/items/:id', (req, res) => this.readOneCallback(req, res));
        this.app.put('/api/items/:id', (req, res) => this.updateCallback(req, res));
        this.app.delete('/api/items/:id', (req, res) => this.deleteCallback(req, res));
    }
    /* Routes callback */
    async createCallback(req, res) {
        console.log("## Create new item ");
        try {
            const newItem = req.body;
            const ret = await this.items.createArticles(newItem);
            if (ret) {
                res.status(201).json(ret);
            }
            else {
                res.status(500).json();
            }
        }
        catch (error) {
            res.status(500).json({ error: error });
        }
    }
    async readCallback(req, res) {
        console.log("## Read all items  ");
        try {
            let categoryFilter = req.query.category; // Optionnel: Filtrer par catégorie
            if (typeof categoryFilter != "string") {
                categoryFilter = "*";
            }
            const ret = await this.items.readArticles(categoryFilter);
            if (ret) {
                if (ret.length > 0)
                    res.status(200).json(ret);
                else
                    res.status(204).json("No content found");
            }
            else {
                res.status(500).json(ret);
            }
        }
        catch (error) {
            res.status(500).json({ error: error });
        }
    }
    async readOneCallback(req, res) {
        console.log("## Read one item  ");
        try {
            const id = Number(req.params.id);
            const ret = await this.items.readOneArticle(id);
            if (ret) {
                res.status(200).json(ret);
            }
            else {
                res.status(500).json(ret);
            }
        }
        catch (error) {
            res.status(500).json({ error: error });
        }
    }
    async updateCallback(req, res) {
        console.log("## Update one item  ");
        try {
            const json = req.body;
            const id = Number(req.params.id);
            const ret = await this.items.updateArticle(id, json);
            res.status(200).json('Article updated');
        }
        catch (error) {
            res.status(500).json({ error: error });
        }
    }
    async deleteCallback(req, res) {
        console.log("## Delete one item  ");
        try {
            const id = Number(req.params.id);
            const ret = await this.items.deleteArticle(id);
            if (ret) {
                res.status(200).json('Product deleted');
            }
            else {
                res.status(404).send('Product not found');
            }
        }
        catch (error) {
            res.status(500).json({ error: error });
        }
    }
}
