'use strict'

const path = require('path');
const fs = require('fs')
const { readdir } = require('fs/promises');
const nftHelper = require('../../helpers/dna-parser')

class NFTController {
  async get (req, res, next) {
    const { type, id } = req.params
    let { width = 500, height = 500 } = req.query
    if (!type || !id) {
      res.status(404).json({ error: 'Wrong format' })
    }

    if (type === 'avatar') {
      const nft = await nftHelper.get(type, id);
      console.log('nfft', nft);

      if (nft) {
        res.setHeader('Content-Type', 'image/svg+xml');
        if (type === 'item') {
          res.render(`layouts/${nft.weapon_material}`, {
            layout: `${nft.weapon_material}.hbs`,
            ...nft,
            width: width,
            height: height
        })
        }
        if (type === 'avatar') {
          res.render(`layouts/avatar`, {
            layout: `avatar.hbs`,
            ...nft,
            width: width,
            height: height
          })
        }
      } else {
        res.status(404).json({ error: 'Nft not found' })
      }
    }  else {
      res.status(404).json({ error: 'File not found' })
    }
  }
}

module.exports = new NFTController()