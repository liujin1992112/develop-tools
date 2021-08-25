namespace MapEditor.Forms
{
    partial class SplitImageDialog
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
            this.SplitImage = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // SplitImage
            // 
            this.SplitImage.Location = new System.Drawing.Point(344, 376);
            this.SplitImage.Name = "SplitImage";
            this.SplitImage.Size = new System.Drawing.Size(75, 23);
            this.SplitImage.TabIndex = 0;
            this.SplitImage.Text = "切割图片";
            this.SplitImage.UseVisualStyleBackColor = true;
            this.SplitImage.Click += new System.EventHandler(this.SplitImage_Click);
            // 
            // SplitImageDialog
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.SplitImage);
            this.Name = "SplitImageDialog";
            this.Text = "切割地图";
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button SplitImage;
    }
}