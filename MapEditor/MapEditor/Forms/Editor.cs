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
    }
}
