namespace MapEditor.Forms
{
    partial class MergeImageDialog
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.openFileDialog1 = new System.Windows.Forms.OpenFileDialog();
            this.ButtonMergeImage = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // openFileDialog1
            // 
            this.openFileDialog1.FileName = "openFileDialog1";
            // 
            // ButtonMergeImage
            // 
            this.ButtonMergeImage.Location = new System.Drawing.Point(330, 352);
            this.ButtonMergeImage.Name = "ButtonMergeImage";
            this.ButtonMergeImage.Size = new System.Drawing.Size(75, 23);
            this.ButtonMergeImage.TabIndex = 0;
            this.ButtonMergeImage.Text = "合并图片";
            this.ButtonMergeImage.UseVisualStyleBackColor = true;
            this.ButtonMergeImage.Click += new System.EventHandler(this.ButtonMergeImage_Click);
            // 
            // MergeImageDialog
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.ButtonMergeImage);
            this.Name = "MergeImageDialog";
            this.Text = "合并图片";
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.OpenFileDialog openFileDialog1;
        private System.Windows.Forms.Button ButtonMergeImage;
    }
}