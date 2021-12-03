using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MapEditor
{
    enum FillType
    {
        normal,
        occlude,
        obstacle,
    }

    class MapData
    {
        private int tileWidth;
        private int tileHeight;

        private Dictionary<int, Dictionary<int, Tile>> tiles = new Dictionary<int, Dictionary<int, Tile>>();

        public int TileWidth { get => tileWidth; set => tileWidth = value; }

        public int TileHeight { get => tileHeight; set => tileHeight = value; }

        public bool HasTile(int row, int col)
        {
            Dictionary<int, Tile> dict;
            if (this.tiles.TryGetValue(row, out dict))
            {
                return dict.ContainsKey(col);
            }
            return false;
        }

        public bool TryGetTile(int row, int col, out Tile tile)
        {
            Dictionary<int, Tile> dict = null;
            if (this.tiles.TryGetValue(row, out dict))
            {
                return dict.TryGetValue(col, out tile);
            }
            tile = null;
            return false;
        }

        public bool Add(int row, int col, Tile tile)
        {
            Dictionary<int, Tile> dict;
            if (!this.tiles.TryGetValue(row, out dict))
            {
                dict = new Dictionary<int, Tile>();
                this.tiles.Add(row, dict);
            }
            dict.Add(col, tile);
            return true;
        }
    }
}
