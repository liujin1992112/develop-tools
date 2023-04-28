using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using MapEditor.Forms;

namespace MapEditor
{
    public partial class Editor : Form
    {
        public Editor()
        {
            InitializeComponent();
        }

        private void SplitImageMenuItem_Click(object sender, EventArgs e)
        {
            SplitImageDialog dialog = new SplitImageDialog();
            dialog.ShowDialog();
        }

        private void MergeImageMenuItem_Click(object sender, EventArgs e)
        {
            MergeImageDialog dialog = new MergeImageDialog();
            dialog.ShowDialog();
        }

        private void SeperateTextureToolStripMenuItem_Click(object sender, EventArgs e)
        {
            SeparateRGBAndAlphaChannelDialog dialog = new SeparateRGBAndAlphaChannelDialog();
            dialog.Show();
        }

        private void tIFConvertPNGToolStripMenuItem_Click(object sender, EventArgs e)
        {
            TifConvertPNGDialog dialog = new TifConvertPNGDialog();
            dialog.Show();
        }

        private void openMapEditorToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Forms.MapEditor mapEditor = new Forms.MapEditor();
            mapEditor.MaximizeBox = true;
            mapEditor.Show();
        }

        private void bmpConvertPNGToolStripMenuItem_Click(object sender, EventArgs e)
        {
            BmpConvertPNGDialog dialog = new BmpConvertPNGDialog();
            dialog.Show();
        }

        private void MakeSpriteSheetToolStripMenuItem_Click(object sender, EventArgs e)
        {
            SpritesheetDialog dialog = new SpritesheetDialog();
            dialog.Show();
      
        }

        private void MakeFontClipToolStripMenuItem_Click(object sender, EventArgs e)
        {
            FontClipDialog dialog = new FontClipDialog();
            dialog.Show();
        }
    }
}
